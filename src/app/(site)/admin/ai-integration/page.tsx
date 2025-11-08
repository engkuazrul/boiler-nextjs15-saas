import AiIntegration from "@/features/admin/components/ai-integration";
import Breadcrumb from "@/components/layout/dashboard/breadcrumb";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
	title: `AI Integration - ${process.env.SITE_NAME}`,
	description: `AI Integration Description`,
};

export default async function AiIntegrationPage() {
	const key = process.env.OPENAI_API_KEY as string;
	const t = await getTranslations("ai_integration_page");

	return (
		<>
			<Breadcrumb pageTitle={t("heading")} />

			<AiIntegration APIKey={key} />
		</>
	);
}
