import Breadcrumb from "@/components/layout/dashboard/breadcrumb";
import EditProfile from "@/features/user/components/account-settings/edit-profile";
import PasswordChange from "@/features/user/components/account-settings/password-change";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Account Settings - ${process.env.SITE_NAME}`,
	description: `Account Settings Description`,
};

export default function AccountSettingsPage() {
	return (
		<>
			<Breadcrumb pageTitle='Account Settings' />

			<div className='flex flex-wrap gap-11 lg:flex-nowrap'>
				<EditProfile />

				<PasswordChange />
			</div>
		</>
	);
}
