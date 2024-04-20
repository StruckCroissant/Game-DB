import * as z from "zod";

export const nonUndefinedSchema = z.custom((x) => x !== undefined);
