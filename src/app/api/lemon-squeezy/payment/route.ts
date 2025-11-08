import { lemonSqueezyApiInstance } from "@/features/billing-lemon-squeezy/lib/lemon-squeezy";
import { NextResponse } from "next/server";
import { paymentSchema } from "@/features/billing-lemon-squeezy/schemas";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
	try {
		const payload = await req.json();

		const res = paymentSchema.safeParse(payload);

		if (!res.success) {
			return NextResponse.json(
				{ message: "Invalid Payload", errors: res.error.flatten().fieldErrors },
				{ status: 400 }
			);
		}

		const response = await lemonSqueezyApiInstance.post("/checkouts", {
			data: {
				type: "checkouts",
				attributes: {
					checkout_data: {
						custom: {
							user_id: "123",
						},
					},
				},
				relationships: {
					store: {
						data: {
							type: "stores",
							id: process.env.LEMON_SQUEEZY_STORE_ID || "",
						},
					},
					variant: {
						data: {
							type: "variants",
							id: res.data.productId,
						},
					},
				},
			},
		});

		const checkoutUrl = response.data.data.attributes.url;

		// if already purchased then redirect to change plan

		return NextResponse.json({ checkoutUrl: checkoutUrl }, { status: 200 });
	} catch (error) {
		return Response.json({ message: "An error occurred" }, { status: 500 });
	}
}
