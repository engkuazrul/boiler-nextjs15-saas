import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";
import {
	errorResponse,
	successResponse,
	withErrorHandling,
} from "@/lib/api-response";
import { validateRequest } from "@/lib/api-validation";
import { newsletterPayloadSchema } from "./schema";

export async function POST(req: NextRequest) {
	return withErrorHandling(async () => {
		const validation = await validateRequest(req, newsletterPayloadSchema);
		if (validation instanceof Response) return validation;

		const MailchimpKey = process.env.MAILCHIMP_API_KEY;
		const MailchimpServer = process.env.MAILCHIMP_API_SERVER;
		const MailchimpAudience = process.env.MAILCHIMP_AUDIENCE_ID;

		const customUrl = `https://${MailchimpServer}.api.mailchimp.com/3.0/lists/${MailchimpAudience}/members`;

		try {
			const { data } = await axios.post(
				customUrl,
				{
					email_address: validation.data.email,
					status: "subscribed",
				},
				{
					headers: {
						Authorization: `apikey ${MailchimpKey}`,
						"Content-Type": "application/json",
					},
				}
			);

			return successResponse(data, "Successfully subscribed to newsletter");
		} catch (error) {
			if (error instanceof AxiosError) {
				return errorResponse(
					error.response?.data?.error?.detail || "Failed to subscribe",
					error.response?.status || 500
				);
			}

			return errorResponse("Failed to subscribe to newsletter", 500);
		}
	});
}
