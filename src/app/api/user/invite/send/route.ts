import { sendEmail } from "@/lib/email";
import { isAuthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
	conflictResponse,
	errorResponse,
	successResponse,
	unauthorizedResponse,
	withErrorHandling,
} from "@/lib/api-response";
import { validateRequest } from "@/lib/api-validation";
import crypto from "node:crypto";
import { invitationSendSchema } from "@/features/auth/schemas";

export async function POST(request: Request) {
	return withErrorHandling(async () => {
		const validation = await validateRequest(request, invitationSendSchema);
		if (validation instanceof Response) return validation;

		const { email, role } = validation.data;

		const isAlreadyInvited = await prisma.invitation.findUnique({
			where: { email },
		});

		if (isAlreadyInvited) {
			return conflictResponse("User already invited");
		}

		const user = await isAuthorized();

		if (!user || user.role !== "ADMIN") {
			return unauthorizedResponse("Only administrators can send invitations");
		}

		const token = crypto.randomBytes(32).toString("hex");

		await prisma.invitation.create({
			data: {
				email,
				token,
				role,
				expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
			},
		});

		const inviteLink = `${process.env.NEXTAUTH_URL}/auth/invite?token=${token}`;

		try {
			await sendEmail({
				to: email,
				subject: "Invitation to Login",
				html: ` 
        <div>
          <h1>You have been invited to login to your account</h1>
          <p>Click the link below login</p>
          <a href="${inviteLink}" target="_blank">Activate Account</a>
        </div>
        `,
			});

			return successResponse(undefined, "Invitation sent successfully");
		} catch (error) {
			return errorResponse(
				"Failed to send invitation email. Please try again",
				500
			);
		}
	});
}
