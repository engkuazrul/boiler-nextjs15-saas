import { getApiKeys } from "@/features/user/actions/api-key";
import Breadcrumb from "@/components/ui/dashboard/breadcrumb";
import CreateToken from "@/features/user/components/api/create-token";
import TokenList from "@/features/user/components/api/token-list";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `API - ${process.env.SITE_NAME}`,
	description: `API Key page for ${process.env.SITE_NAME}`,
	// other descriptions
};

export default async function UserApiPage() {
	const tokens = await getApiKeys();

	return (
		<>
			<Breadcrumb pageTitle='API' />
			<div className='flex flex-col gap-y-10 lg:flex-row lg:gap-x-8 lg:gap-y-4'>
				<CreateToken />
				<TokenList tokens={tokens} />
			</div>
		</>
	);
}
