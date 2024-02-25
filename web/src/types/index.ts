/** src/common/types.ts
 *
 * Used to define HTTP return types
 */
import * as z from "zod";
import { AxiosError } from "axios";
import {
  userLoginSchema,
  dataResponseSchema,
  userSchema,
  registerSchema,
  problemResponseSchema,
  problemSchema,
} from "@/types/schemas";

//<editor-fold desc="Request">
export type UserLoginRequest = z.infer<typeof userLoginSchema>;
//</editor-fold>

//<editor-fold desc="Response">
export type DataOrProblemResponse = Problem | DataResponse;
export type DataResponse = z.infer<typeof dataResponseSchema>;
export const isDataResponse = (
  maybeData: DataOrProblemResponse
): maybeData is DataResponse => {
  return dataResponseSchema.safeParse(maybeData).success;
};

export type Problem = z.infer<typeof problemSchema>;
export type ProblemResponse = z.infer<typeof problemResponseSchema>;
export const isProblem = (maybeProblem: unknown): maybeProblem is Problem =>
  problemSchema.safeParse(maybeProblem).success;

export type User = z.infer<typeof userSchema>;
export type Register = z.infer<typeof registerSchema>;
export const isAxiosError = (error: unknown): error is AxiosError =>
  (error as AxiosError).isAxiosError;
//</editor-fold>

//<editor-fold desc="Utility types">
export type MaybeProblemPromise<T> = Promise<T | ProblemResponse>;
//</editor-fold>
