/** src/common/types.ts
 *
 * Used to define HTTP return types
 */
import type * as z from "zod";
import type {
  userLoginSchema,
  problemSchema,
  userSchema,
  registerSchema,
} from "@/types/schemas";

//<editor-fold desc="Request">
export type UserLoginRequest = z.infer<typeof userLoginSchema>;
//</editor-fold>

//<editor-fold desc="Error Request">
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
type Problem = z.infer<typeof problemSchema>;
export type User = z.infer<typeof userSchema>;
export type Register = z.infer<typeof registerSchema>;
//</editor-fold>

//<editor-fold desc="Utility types">
export type MaybeProblemPromise<T> = Promise<T | Problem>;
//</editor-fold>
