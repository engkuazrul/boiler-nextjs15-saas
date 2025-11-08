import { hashPassword } from "@/utils/crypto";
import { prisma } from "@/lib/prisma";
import {
	notFoundResponse,
	successResponse,
	withErrorHandling,
} from "@/lib/api-response";
import { validateRequest } from "@/lib/api-validation";
import { updatePasswordSchema } from "./schema";

export async function POST(request: Request) {
	return withErrorHandling(async () => {
		const validation = await validateRequest(request, updatePasswordSchema);
		if (validation instanceof Response) return validation;

		const { email, password } = validation.data;

		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return notFoundResponse("User does not exist");
		}

		const hashedPassword = await hashPassword(password);

		await prisma.user.update({
			where: { email },
			data: {
				password: hashedPassword,
				passwordResetToken: null,
				passwordResetTokenExp: null,
			},
		});

		return successResponse(undefined, "Password updated successfully");
	});
}
