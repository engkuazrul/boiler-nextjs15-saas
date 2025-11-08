/**
 * Pricing type for subscription plans
 * Used by multiple billing integrations (Stripe, Paddle, LemonSqueezy)
 */

export type Price = {
	priceId?: string;
	subscriptionId?: string;
	currentPeriodEnd?: Date;
	customerId?: string;
	isSubscribed?: boolean;
	isCanceled?: boolean;
	unit_amount: number;
	nickname: string;
	description: string;
	subtitle: string;
	includes: string[];
	icon: string;
	icon2?: string;
	active?: boolean;
};

