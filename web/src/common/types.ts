/* eslint-disable @typescript-eslint/no-unused-vars */

/** src/common/types.ts
 *
 * Used to define HTTP return types
 */
import type * as z from "zod";
import type { userLoginSchema, problemSchema } from "@/common/schemas";

//<editor-fold desc="Request">
type UserLoginRequest = z.infer<typeof userLoginSchema>;
//</editor-fold>

//<editor-fold desc="Error Request">
type Problem = z.infer<typeof problemSchema>;
//</editor-fold>

export type { UserLoginRequest };
