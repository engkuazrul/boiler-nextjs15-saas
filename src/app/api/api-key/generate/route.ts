import { prisma } from "@/lib/prisma";
import {
	notFoundResponse,
	successResponse,
	withErrorHandling,
} from "@/lib/api-response";
import { validateRequest } from "@/lib/api-validation";
import bcrypt from "bcrypt";
import { generateAPIKeyPayloadSchema } from "./schema";

export async function POST(request: Request) {
	return withErrorHandling(async () => {
		const validation = await validateRequest(
			request,
			generateAPIKeyPayloadSchema
		);
		if (validation instanceof Response) return validation;

		const { email, keyName } = validation.data;

		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return notFoundResponse("User not found");
		}

		const key = user.role as string;
		const hashedKey = await bcrypt.hash(key, 10);

		await prisma.apiKey.create({
			data: {
				name: keyName,
				key: hashedKey,
				userId: user.id,
			},
		});

		return successResponse(
			{ key: hashedKey },
			"API key generated successfully"
		);
	});
}
