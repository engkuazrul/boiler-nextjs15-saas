import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
	errorResponse,
	successResponse,
	unauthorizedResponse,
	withErrorHandling,
} from "@/lib/api-response";
import { validateRequest } from "@/lib/api-validation";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { updateUserSchema } from "./schema";

export async function POST(request: Request) {
	return withErrorHandling(async () => {
		const validation = await validateRequest(request, updateUserSchema);
		if (validation instanceof Response) return validation;

		const session = await getServerSession(authOptions);

		if (!session?.user) {
			return unauthorizedResponse("Please sign in to continue");
		}

		if (session.user.email?.includes("demo-")) {
			return errorResponse("Cannot update demo user");
		}

		const user = await prisma.user.update({
			where: {
				email: session.user.email as string,
			},
			data: validation.data,
		});

		revalidatePath("/user");

		return successResponse(
			{
				email: user.email,
				name: user.name,
				image: user.image,
			},
			"User updated successfully"
		);
	});
}
