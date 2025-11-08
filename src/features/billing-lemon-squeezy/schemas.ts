import { z } from "zod";

/**
 * Lemon Squeezy payment schema
 */
export const paymentSchema = z.object({
	productId: z.string(),
});

/**
 * Lemon Squeezy cancel subscription schema
 */
export const cancelSubscriptionSchema = z.object({
	subscriptionId: z.string(),
});
