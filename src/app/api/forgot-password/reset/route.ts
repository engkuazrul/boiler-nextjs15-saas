import { sendEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import {
	errorResponse,
	notFoundResponse,
	successResponse,
	withErrorHandling,
} from "@/lib/api-response";
import { validateRequest } from "@/lib/api-validation";
import crypto from "node:crypto";
import { resetPasswordSchema } from "./schema";

export async function POST(request: Request) {
	return withErrorHandling(async () => {
		const validation = await validateRequest(request, resetPasswordSchema);
		if (validation instanceof Response) return validation;

		const { email } = validation.data;

		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return notFoundResponse("User does not exist");
		}

		const resetToken = crypto.randomBytes(20).toString("hex");
		const passwordResetTokenExp = new Date();
		passwordResetTokenExp.setMinutes(passwordResetTokenExp.getMinutes() + 10);

		await prisma.user.update({
			where: { email },
			data: {
				passwordResetToken: resetToken,
				passwordResetTokenExp,
			},
		});

		const resetURL = `${process.env.SITE_URL}/auth/reset-password/${resetToken}`;

		try {
			await sendEmail({
				to: email,
				subject: "Reset your password",
				html: ` 
        <div>
          <h1>You requested a password reset</h1>
          <p>Click the link below to reset your password</p>
          <a href="${resetURL}" target="_blank">Reset Password</a>
        </div>
        `,
			});

			return successResponse(
				undefined,
				"Password reset email sent successfully"
			);
		} catch (error) {
			return errorResponse("Failed to send email. Please try again", 500);
		}
	});
}
