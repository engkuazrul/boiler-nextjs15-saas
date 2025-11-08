import Breadcrumb from "@/components/ui/dashboard/breadcrumb";
import EditProfile from "@/features/user/components/AccountSettings/EditProfile";
import PasswordChange from "@/features/user/components/AccountSettings/PasswordChange";
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
