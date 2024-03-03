/** src/common/types.ts
 *
 * Used to define HTTP return types
 */
import * as z from "zod";
import { AxiosError } from "axios";
import {
  userLoginSchema,
  createGenericDataResponseSchema,
  userSchema,
  registerSchema,
  problemResponseSchema,
  problemSchema,
  nonUndefinedSchema,
  dataResponseSchema,
} from "@/types/schemas";

//#region Utilty types
export type NonUndefined = z.infer<typeof nonUndefinedSchema>;
export type MaybeProblemPromise<T> = Promise<T | Problem>;
//#endregion

export type UserLoginRequest = z.infer<typeof userLoginSchema>;

//#region Response
export type DataResponse<T extends NonUndefined> = z.infer<
  ReturnType<typeof createGenericDataResponseSchema<z.ZodType<T>>>
>;
export type DataOrProblemResponse<T> = Problem | DataResponse<T>;
export const isDataResponse = <T>(
  maybeData: unknown
): maybeData is DataResponse<T> =>
  dataResponseSchema.safeParse(maybeData).success;

export type Problem = z.infer<typeof problemSchema>;
export type ProblemResponse = z.infer<typeof problemResponseSchema>;
export const isProblem = (maybeProblem: unknown): maybeProblem is Problem =>
  problemSchema.safeParse(maybeProblem).success;

export type User = z.infer<typeof userSchema>;
export const isUser = (user: unknown): user is User =>
  userSchema.safeParse(user).success;
export type Register = z.infer<typeof registerSchema>;
export const isAxiosError = (error: unknown): error is AxiosError =>
  (error as AxiosError).isAxiosError;
//#endregion
