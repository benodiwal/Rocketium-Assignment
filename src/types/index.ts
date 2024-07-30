import { z } from "zod";

export const dataShape = z.array(
  z.object({
    name: z.string(),
    language: z.string(),
    id: z.string(),
    bio: z.string(),
    version: z.number(),
  })
);

export type DataRecord = z.infer<typeof dataShape>[0];
