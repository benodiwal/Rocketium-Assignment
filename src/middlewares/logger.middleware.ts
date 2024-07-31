import { Request } from "express";
import morgan from "morgan";
import { RESERVED_KEYS } from "../constants/index";

const logger = () => {
  morgan.token("filters", (req: Request) => {
    const query = req.query;
    const resQuery: Request["query"] = {};
    for (const key in query) {
      if (RESERVED_KEYS.includes(key)) {
        resQuery[key] = query[key];
      }
    }
    return JSON.stringify(resQuery);
  });

  morgan.token("field_queries", (req: Request) => {
    const query = req.query;
    const resQuery: Request["query"] = {};
    for (const key in query) {
      if (!RESERVED_KEYS.includes(key)) {
        resQuery[key] = query[key];
      }
    }
    return JSON.stringify(resQuery);
  });

  morgan.token("pathname", (req: Request) => req.path);

  return morgan(
    ":method :pathname :status :response-time ms\nfilters: :filters\nfield_queries: :field_queries"
  );
};

export default logger;
