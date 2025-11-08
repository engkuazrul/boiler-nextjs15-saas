import { prisma } from "@/lib/prisma";
import {
	errorResponse,
	successResponse,
	withErrorHandling,
} from "@/lib/api-response";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
	return withErrorHandling(async () => {
		const encodedEmail = req.nextUrl.searchParams.get("email");
		const email = decodeURIComponent(encodedEmail || "");

		if (!email) {
			return errorResponse("Email is required");
		}

		const emailValidation = z.string().email().safeParse(email);

		if (!emailValidation.success) {
			return errorResponse("Invalid email format");
		}

		const user = await prisma.user.findUnique({
			where: { email },
		});

		return successResponse({
			priceId: user?.priceId,
			subscriptionId: user?.subscriptionId,
			currentPeriodEnd: user?.currentPeriodEnd,
		});
	});
}
