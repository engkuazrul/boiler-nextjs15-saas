import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
	successResponse,
	unauthorizedResponse,
	withErrorHandling,
} from "@/lib/api-response";
import { validateRequest } from "@/lib/api-validation";
import { getServerSession } from "next-auth";
import { deleteAPIKeySchema } from "@/features/user/schemas";

export async function DELETE(request: Request) {
	return withErrorHandling(async () => {
		const session = await getServerSession(authOptions);

		if (!session?.user) {
			return unauthorizedResponse("Please sign in to continue");
		}

		const validation = await validateRequest(request, deleteAPIKeySchema);
		if (validation instanceof Response) return validation;

		await prisma.apiKey.delete({
			where: { id: validation.data.id },
		});

		return successResponse(undefined, "API key deleted successfully");
	});
}
