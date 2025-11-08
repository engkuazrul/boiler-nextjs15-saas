import { prisma } from "@/lib/prisma";
import { excludeFields } from "@/utils/data-utils";
import {
	conflictResponse,
	successResponse,
	withErrorHandling,
} from "@/lib/api-response";
import { validateRequest } from "@/lib/api-validation";
import bcrypt from "bcrypt";
import { registerSchema } from "./schema";

export async function POST(request: Request) {
	return withErrorHandling(async () => {
		const validation = await validateRequest(request, registerSchema);
		if (validation instanceof Response) return validation;

		const { name, email, password } = validation.data;

		const isUserRegistered = await prisma.user.findUnique({
			where: { email },
		});

		if (isUserRegistered) {
			return conflictResponse("Email already exists");
		}

		const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
		const isAdminEmail = adminEmails.includes(email);

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role: isAdminEmail ? "ADMIN" : "USER",
			},
		});

		const sanitizedUser = excludeFields(user, [
			"password",
			"passwordResetToken",
			"passwordResetTokenExp",
		]);

		return successResponse(sanitizedUser, "User created successfully", 201);
	});
}
