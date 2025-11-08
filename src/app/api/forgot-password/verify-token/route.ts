import { prisma } from "@/lib/prisma";
import { excludeFields } from "@/utils/data-utils";
import {
	errorResponse,
	successResponse,
	withErrorHandling,
} from "@/lib/api-response";
import { validateRequest } from "@/lib/api-validation";
import { verifyTokenSchema } from "@/features/auth/schemas";

export const POST = async (request: Request) => {
	return withErrorHandling(async () => {
		const validation = await validateRequest(request, verifyTokenSchema);
		if (validation instanceof Response) return validation;

		const user = await prisma.user.findUnique({
			where: {
				passwordResetToken: validation.data.token,
				passwordResetTokenExp: {
					gte: new Date(),
				},
			},
		});

		if (!user) {
			return errorResponse("Invalid or expired token");
		}

		const sanitizedUser = excludeFields(user, [
			"password",
			"passwordResetToken",
			"passwordResetTokenExp",
		]);

		return successResponse(sanitizedUser);
	});
};
