import Breadcrumb from "@/components/layout/dashboard/breadcrumb";
import AccountSettings from "@/features/user/components/account-settings";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
	title: `User Dashboard - ${process.env.SITE_NAME}`,
	description: `This is User Dashboard page for ${process.env.SITE_NAME}`,
	// other descriptions
};

export default async function Page() {
	const t = await getTranslations("account_settings_page");

	return (
		<>
			<Breadcrumb pageTitle={t("heading")} />
			<AccountSettings />
		</>
	);
}
