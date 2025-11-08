import SendNewsletterCard from "@/features/admin/components/send-newsletter/send-newsletter-card";
import Breadcrumb from "@/components/layout/dashboard/breadcrumb";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
	title: `Send Newsletter - ${process.env.SITE_NAME}`,
	description: "Send Newsletter Description",
};

export default async function SendNewsletterPage() {
	const t = await getTranslations("send_newsletter_page");

	return (
		<>
			<Breadcrumb pageTitle={t("heading")} />

			<SendNewsletterCard />
		</>
	);
}
