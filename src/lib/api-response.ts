import { NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Standard API response structure
 */
interface ApiResponse<T = unknown> {
	success: boolean;
	message?: string;
	data?: T;
	errors?: Record<string, string[]>;
}

/**
 * Success response helper
 */
export function successResponse<T>(
	data?: T,
	message?: string,
	status = 200
): NextResponse<ApiResponse<T>> {
	return NextResponse.json(
		{
			success: true,
			message,
			data,
		},
		{ status }
	);
}

/**
 * Error response helper
 */
export function errorResponse(
	message: string,
	status = 400,
	errors?: Record<string, string[]>
): NextResponse<ApiResponse> {
	return NextResponse.json(
		{
			success: false,
			message,
			errors,
		},
		{ status }
	);
}

/**
 * Validation error response (from Zod)
 */
export function validationErrorResponse(
	error: ZodError
): NextResponse<ApiResponse> {
	return NextResponse.json(
		{
			success: false,
			message: "Validation failed",
			errors: error.flatten().fieldErrors as Record<string, string[]>,
		},
		{ status: 400 }
	);
}

/**
 * Unauthorized response
 */
export function unauthorizedResponse(
	message = "Unauthorized"
): NextResponse<ApiResponse> {
	return errorResponse(message, 401);
}

/**
 * Not found response
 */
export function notFoundResponse(
	message = "Resource not found"
): NextResponse<ApiResponse> {
	return errorResponse(message, 404);
}

/**
 * Conflict response
 */
export function conflictResponse(
	message = "Resource already exists"
): NextResponse<ApiResponse> {
	return errorResponse(message, 409);
}

/**
 * Internal server error response
 */
function serverErrorResponse(
	message = "Internal server error"
): NextResponse<ApiResponse> {
	return errorResponse(message, 500);
}

/**
 * Handle async API route with error catching
 */
export function withErrorHandling<T>(
	handler: () => Promise<NextResponse<T>>
): Promise<NextResponse<T | ApiResponse>> {
	return handler().catch((error) => {
		// eslint-disable-next-line no-console
		console.error("API Error:", error);
		return serverErrorResponse(
			error instanceof Error ? error.message : "An unexpected error occurred"
		);
	});
}
