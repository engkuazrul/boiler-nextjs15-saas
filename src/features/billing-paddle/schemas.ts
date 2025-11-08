import { z } from "zod";

/**
 * Paddle cancel subscription schema
 */
export const cancelSubscriptionSchema = z.object({
	subscriptionId: z.string(),
});

/**
 * Paddle change plan schema
 */
export const changePlanSchema = z.object({
	subscriptionId: z.string(),
	priceId: z.string(),
});
