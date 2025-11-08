import { z } from "zod";

/**
 * Update user profile schema
 * Partial schema allowing optional updates to name, email, and image
 */
export const updateUserSchema = z
	.object({
		name: z
			.string()
			.min(2, { message: "Name must be at least 2 characters long" }),
		email: z.string().email(),
		image: z.string(),
	})
	.partial();

/**
 * Delete user account schema
 */
export const deleteUserSchema = z.object({
	email: z.string().email(),
});

/**
 * Generate API key schema
 */
export const generateAPIKeySchema = z.object({
	email: z.string().email(),
	keyName: z.string(),
});

/**
 * Delete API key schema
 */
export const deleteAPIKeySchema = z.object({
	id: z.string(),
});
