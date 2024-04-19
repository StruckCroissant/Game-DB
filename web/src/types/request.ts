import * as z from "zod";
import { nonUndefinedSchema } from "./utility";

export const createGenericDataResponseSchema = <
  DataType extends z.ZodType<NonUndefined>
>(
  data: DataType
) =>
  z.object({
    data,
  });

export const dataResponseSchema =
  createGenericDataResponseSchema(nonUndefinedSchema);

export type NonUndefined = z.infer<typeof nonUndefinedSchema>;

export type DataResponse<T extends NonUndefined> = z.infer<
  ReturnType<typeof createGenericDataResponseSchema<z.ZodType<T>>>
>;

export const isDataResponse = <T>(
  maybeData: unknown
): maybeData is DataResponse<T> =>
  dataResponseSchema.safeParse(maybeData).success;
