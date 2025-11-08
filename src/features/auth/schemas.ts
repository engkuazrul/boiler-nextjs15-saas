import { z } from "zod";

/**
 * Password validation regex patterns
 */
const REGEX = {
	uppercase: /[A-Z]/,
	lowercase: /[a-z]/,
	number: /\d/,
	// eslint-disable-next-line no-useless-escape
	specialChar: /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/]/,
};

/**
 * Shared password schema with validation rules
 */
export const passwordSchema = z
	.string()
	.min(8, { message: "Password must be at least 8 characters long" })
	.max(128, { message: "Password cannot exceed 128 characters" })
	.refine((val) => REGEX.uppercase.test(val), {
		message: "Password must contain at least one uppercase letter",
	})
	.refine((val) => REGEX.lowercase.test(val), {
		message: "Password must contain at least one lowercase letter",
	})
	.refine((val) => REGEX.number.test(val), {
		message: "Password must contain at least one number",
	})
	.refine((val) => REGEX.specialChar.test(val), {
		message: "Password must contain at least one special character",
	});

/**
 * User registration schema
 */
export const registerSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters long" }),
	email: z.string().email(),
	password: passwordSchema,
});

/**
 * Forgot password request schema
 */
export const forgotPasswordSchema = z.object({
	email: z.string().email(),
});

/**
 * Reset password schema
 */
export const resetPasswordSchema = z.object({
	email: z.string().email(),
	password: passwordSchema,
});

/**
 * Verify reset token schema
 */
export const verifyTokenSchema = z.object({
	token: z.string(),
});

/**
 * Change password schema (for logged-in users)
 */
export const changePasswordSchema = z
	.object({
		email: z.string().email(),
		password: passwordSchema,
		currentPassword: passwordSchema,
	})
	.refine((data) => data.password !== data.currentPassword, {
		message: "New password can't be the same as currentPassword",
		path: ["password"],
	});

/**
 * Send invitation schema
 */
export const invitationSendSchema = z.object({
	email: z.string().email(),
	role: z.enum(["ADMIN", "USER"]),
});

/**
 * Accept invitation and create account schema
 */
export const inviteSigninSchema = z.object({
	token: z.string(),
	password: passwordSchema,
});
