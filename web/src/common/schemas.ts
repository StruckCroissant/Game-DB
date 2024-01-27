/** src/common/schemas.ts
 *
 * Used to define Zod schemas
 */
import { toTypedSchema } from "@vee-validate/zod";
import type { TypedSchema } from "vee-validate";
import * as z from "zod";

//<editor-fold desc="Request">
export const userLoginSchema = z.object({
  username: z.string().min(1, "username is required"),
  password: z.string().min(1, "password is required"),
});
//</editor-fold>

//<editor-fold desc="Response">
// Error
export const problemSchema = z.object({
  type: z.string(),
  title: z.string(),
  message: z.string(),
  status: z.number(),
});
//</editor-fold>

//<editor-fold desc="Utility">
export const requiredFieldSchema = (
  fieldName: string
): TypedSchema<string, string> =>
  toTypedSchema(z.string().nonempty(`${fieldName} is required`));
//</editor-fold>
