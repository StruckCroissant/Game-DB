/** src/common/schemas.ts
 *
 * Used to define Zod schemas
 */
import { toTypedSchema } from "@vee-validate/zod";
import type { TypedSchema } from "vee-validate";
import * as z from "zod";
import { NonUndefined } from ".";

//#region Utility schemas
export const nonUndefinedSchema = z.custom((x) => x !== undefined);
//#endregion

//#region Request
export const userLoginSchema = z.object({
  username: z.string().min(1, "username is required"),
  password: z.string().min(1, "password is required"),
});
//#endregion

//#region Response

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
//#endregion

//#region Utility
export const requiredFieldSchema = (
  fieldName: string
): TypedSchema<string, string> =>
  toTypedSchema(z.string().nonempty(`${fieldName} is required`));
//#endregion
