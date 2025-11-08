import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
	errorResponse,
	notFoundResponse,
	successResponse,
	unauthorizedResponse,
	withErrorHandling,
} from "@/lib/api-response";
import { validateRequest } from "@/lib/api-validation";
import { getServerSession } from "next-auth";
import { userDeleteSchema } from "./schema";

export async function DELETE(request: Request) {
	return withErrorHandling(async () => {
		const validation = await validateRequest(request, userDeleteSchema);
		if (validation instanceof Response) return validation;

		const { email } = validation.data;

		if (email.includes("demo-")) {
			return errorResponse("Cannot delete demo user");
		}

		const session = await getServerSession(authOptions);

		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return notFoundResponse("User not found");
		}

		const isAuthorized =
			session?.user.email === user.email || session?.user.role === "ADMIN";

		if (!isAuthorized) {
			return unauthorizedResponse("You are not authorized to delete this user");
		}

		await prisma.user.delete({
			where: { email },
		});

		return successResponse(undefined, "Account deleted successfully");
	});
}
