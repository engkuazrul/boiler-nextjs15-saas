import { NextResponse } from "next/server";
import { ZodSchema } from "zod";
import { validationErrorResponse } from "./api-response";

/**
 * Validate request body against a Zod schema
 */
export async function validateRequest<T>(
	request: Request,
	schema: ZodSchema<T>
): Promise<{ data: T } | NextResponse> {
	try {
		const body = await request.json();
		const result = schema.safeParse(body);

		if (!result.success) {
			return validationErrorResponse(result.error);
		}

		return { data: result.data };
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: "Invalid JSON payload",
			},
			{ status: 400 }
		);
	}
}

/**
 * Validate query parameters against a Zod schema
 */
export function validateQueryParams<T>(
	searchParams: URLSearchParams,
	schema: ZodSchema<T>
): { data: T } | NextResponse {
	const params = Object.fromEntries(searchParams.entries());
	const result = schema.safeParse(params);

	if (!result.success) {
		return validationErrorResponse(result.error);
	}

	return { data: result.data };
}
