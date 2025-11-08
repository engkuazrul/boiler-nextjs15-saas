import { hashPassword } from "@/utils/crypto";
import { prisma } from "@/lib/prisma";
import {
	conflictResponse,
	errorResponse,
	successResponse,
	withErrorHandling,
} from "@/lib/api-response";
import { validateRequest } from "@/lib/api-validation";
import { inviteSigninSchema } from "./schema";

export async function POST(request: Request) {
	return withErrorHandling(async () => {
		const validation = await validateRequest(request, inviteSigninSchema);
		if (validation instanceof Response) return validation;

		const { token, password } = validation.data;

		const invitation = await prisma.invitation.findUnique({
			where: { token },
			include: { user: true },
		});

		if (!invitation) {
			return errorResponse("Invalid invitation token");
		}

		if (invitation.expiresAt < new Date()) {
			return errorResponse("Invitation token has expired", 410);
		}

		if (invitation.accepted || invitation.user) {
			return conflictResponse("Invitation already accepted");
		}

		const hashedPassword = await hashPassword(password);

		await prisma.$transaction(async (tx) => {
			const user = await tx.user.create({
				data: {
					name: "Guest",
					email: invitation.email,
					password: hashedPassword,
					role: invitation.role,
				},
			});

			await tx.invitation.update({
				where: { id: invitation.id },
				data: { accepted: true, userId: user.id },
			});
		});

		return successResponse(undefined, "Account created successfully", 201);
	});
}
