import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
	successResponse,
	unauthorizedResponse,
	withErrorHandling,
} from "@/lib/api-response";
import { getServerSession } from "next-auth";

export async function GET() {
	return withErrorHandling(async () => {
		const session = await getServerSession(authOptions);

		if (!session?.user) {
			return unauthorizedResponse("Please sign in to continue");
		}

		const keys = await prisma.apiKey.findMany({
			where: {
				userId: session.user.id,
			},
		});

		return successResponse(keys);
	});
}
