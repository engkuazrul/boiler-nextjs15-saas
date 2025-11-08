import Pricing from "@/features/billing-stripe/components";
// import Pricing from "@/features/paddle-billing/components";
// import Pricing from "@/features/lemon-squeezy-billing/components";

const Billing = () => {
	return (
		<>
			<Pricing isBilling={true} />
		</>
	);
};

export default Billing;
