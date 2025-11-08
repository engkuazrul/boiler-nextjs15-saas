import { z } from "zod";

/**
 * Newsletter subscription schema
 */
export const newsletterSchema = z.object({
	email: z.string().email(),
});
