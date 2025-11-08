"use client";
import Pricing from "@/features/billing-stripe/components";
// import Pricing from "@/features/paddle-billing/components";
// import Pricing from "@/features/lemon-squeezy-billing/components";

const HomePricing = () => {
	return (
		<>
			<Pricing isBilling={false} />
		</>
	);
};

export default HomePricing;
