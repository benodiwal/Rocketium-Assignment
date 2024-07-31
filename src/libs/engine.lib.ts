import type { Request } from "express";
import { FIELDS, RESERVED_KEYS } from "../constants/index";
import { DataRecord } from "types/index";

class QueryEngine {
  private static filterByField(
    item: DataRecord,
    key: keyof DataRecord,
    value: string,
    caseInsensitive: boolean = false
  ): boolean {
    if (typeof item[key] === "number") {
      return item[key] === parseInt(value as unknown as string);
    } else if (caseInsensitive) {
      if (!item[key]) return false;
      return item[key].toLowerCase() === value.toLowerCase();
    } else {
      return item[key] === value;
    }
  }

  public static executeQueries(
    data: DataRecord[],
    query: Request["query"]
  ): DataRecord[] {
    const sortBy = query['sortBy'];
    const order = query['order'];
    const limit = query['limit'];
    const offset = query['offset'];
    const caseInsensitive = query['insensitive'] === "true";

    let resData = [...data];

    for (const stringKey in query) {
      if (RESERVED_KEYS.includes(stringKey) || !FIELDS.includes(stringKey)) {
        continue;
      }
      const key = stringKey as keyof DataRecord;
      const fieldValue = query[key];
      if (typeof fieldValue === "string") {
        resData = resData.filter((item) => {
          return QueryEngine.filterByField(item, key, fieldValue, caseInsensitive);
        });
      } else if (Array.isArray(fieldValue)) {
        resData = resData.filter((item) => {
          return fieldValue.every((f) => {
            const value = f as string;
            return QueryEngine.filterByField(item, key, value, caseInsensitive);
          });
        });
      }
    }

    if (typeof sortBy === "string" && FIELDS.includes(sortBy)) {
      const typedSortBy = sortBy as keyof DataRecord;
      resData.sort((a, b) => {
        if (typeof a[typedSortBy] === "string") {
          return a[typedSortBy].localeCompare(b[typedSortBy] as string);
        } else {
          return (a[typedSortBy] as number) - (b[typedSortBy] as number);
        }
      });
    }

    if (typeof order === "string" && order === "desc") {
      resData.reverse();
    }

    if (typeof offset === "string") {
      const numberOffset = parseInt(offset);
      if (!Number.isNaN(numberOffset)) {
        resData = resData.slice(numberOffset);
      }
    }

    if (typeof limit === "string") {
      const numberLimit = parseInt(limit);
      if (!Number.isNaN(numberLimit)) {
        resData = resData.slice(0, numberLimit);
      }
    }

    return resData;
  }
}

export default QueryEngine;
