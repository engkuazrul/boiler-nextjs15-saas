import { prisma } from "@/lib/prisma";
import {
	errorResponse,
	notFoundResponse,
	successResponse,
	withErrorHandling,
} from "@/lib/api-response";
import { validateRequest } from "@/lib/api-validation";
import bcrypt from "bcrypt";
import { changePasswordSchema } from "./schema";

export async function POST(request: Request) {
	return withErrorHandling(async () => {
		const validation = await validateRequest(request, changePasswordSchema);
		if (validation instanceof Response) return validation;

		const { email, currentPassword, password } = validation.data;

		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return notFoundResponse("User not found");
		}

		if (user.email?.includes("demo-")) {
			return errorResponse("Cannot change password for demo user");
		}

		const passwordMatch = await bcrypt.compare(
			currentPassword,
			user.password as string
		);

		if (!passwordMatch) {
			return errorResponse("Current password is incorrect");
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await prisma.user.update({
			where: { email },
			data: {
				password: hashedPassword,
			},
		});

		return successResponse(undefined, "Password updated successfully");
	});
}
