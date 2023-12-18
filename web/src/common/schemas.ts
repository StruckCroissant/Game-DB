/** src/common/schemas.ts
 *
 * Used to define Zod schemas
 */
import * as z from "zod";

//<editor-fold desc="Request">
const userLoginSchema = z.object({
  username: z.string().min(1, 'username is required'),
  password: z.string().min(1, 'password is required')
});
//</editor-fold>

//<editor-fold desc="Response">
// Error
const problemSchema = z.object({
  type: z.string(),
  title: z.string(),
  message: z.string(),
  status: z.number(),
});
//</editor-fold>

export {
  userLoginSchema,
  problemSchema
};