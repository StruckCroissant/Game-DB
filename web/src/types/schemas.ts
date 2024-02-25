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
export const dataResponseSchema = z.object({
  data: z.custom((x) => x !== undefined),
});

// TODO make this type more descriptive
export const problemSchema = z.object({
  type: z.string(),
  title: z.string(),
  message: z.string(),
  status: z.number(),
  path: z.string().optional(),
  timestamp: z.string().optional(),
});

export const problemResponseSchema = z.object({
  data: problemSchema,
});

// TODO make this type more descriptive
export const userSchema = z.object({
  accountNonExpired: z.boolean(),
  accountNonLocked: z.boolean(),
  authorities: z.array(z.object({ authority: z.string() })),
  credentialsNonExpired: z.boolean(),
  enabled: z.boolean(),
  id: z.number(),
  role: z.string(),
  username: z.string(),
});

export const registerSchema = z.boolean();
//</editor-fold>

//<editor-fold desc="Entities">

//</editor-fold>

//<editor-fold desc="Utility">
export const requiredFieldSchema = (
  fieldName: string
): TypedSchema<string, string> =>
  toTypedSchema(z.string().nonempty(`${fieldName} is required`));
//</editor-fold>
