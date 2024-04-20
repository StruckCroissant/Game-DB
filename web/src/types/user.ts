import * as z from "zod";

export const userLoginSchema = z.object({
  username: z.string().min(1, "username is required"),
  password: z.string().min(1, "password is required"),
});

export const authoritySchema = z.object({
  authority: z.string(),
});

export const userSchema = z.object({
  accountNonExpired: z.boolean(),
  accountNonLocked: z.boolean(),
  authorities: z.array(authoritySchema),
  credentialsNonExpired: z.boolean(),
  enabled: z.boolean(),
  id: z.number(),
  role: z.string(),
  username: z.string(),
});

export type User = z.infer<typeof userSchema>;

export type RegistrationResult = boolean;

export type UserLoginRequest = z.infer<typeof userLoginSchema>;

export const isUser = (user: unknown): user is User =>
  userSchema.safeParse(user).success;
