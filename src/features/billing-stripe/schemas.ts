import { z } from "zod";

/**
 * Stripe payment/checkout schema
 */
export const paymentSchema = z.object({
	userId: z.string().cuid(),
	priceId: z.string(),
	isSubscribed: z.coerce.boolean().optional(),
	stripeCustomerId: z.string().optional(),
});
