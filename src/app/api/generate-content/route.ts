import OpenAI from "openai";
import { isAuthorized } from "@/lib/auth";
import {
	errorResponse,
	successResponse,
	unauthorizedResponse,
	withErrorHandling,
} from "@/lib/api-response";
import { validateRequest } from "@/lib/api-validation";
import { z } from "zod";

const generateContentSchema = z.object({
	prompt: z.array(
		z.object({
			role: z.enum(["system", "user", "assistant"]),
			content: z.string().min(1).max(5000),
		})
	),
});

export async function POST(req: Request) {
	return withErrorHandling(async () => {
		// Check authentication
		const user = await isAuthorized();
		if (!user) {
			return unauthorizedResponse("Authentication required");
		}

		// Validate request body
		const validation = await validateRequest(req, generateContentSchema);
		if (validation instanceof Response) return validation;

		const { prompt } = validation.data;

		// Only use server-side API key, never accept from client
		if (!process.env.OPENAI_API_KEY) {
			return errorResponse("OpenAI API key not configured", 500);
		}

		const openai = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		});

		try {
			const chatCompletion = await openai.chat.completions.create({
				messages: prompt,
				model: "gpt-3.5-turbo",
				temperature: 1,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
			});

			const generatedContent = chatCompletion.choices[0].message?.content;

			return successResponse(
				{ content: generatedContent },
				"Content generated successfully"
			);
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Failed to generate content";
			return errorResponse(message, 500);
		}
	});
}
