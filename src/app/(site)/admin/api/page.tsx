import Breadcrumb from "@/components/ui/dashboard/breadcrumb";
import CreateToken from "@/features/user/components/api/create-token";
import TokenList from "@/features/user/components/api/token-list";
import { Metadata } from "next";
import { getApiKeys } from "@/features/user/actions/api-key";

export const metadata: Metadata = {
	title: `API - ${process.env.SITE_NAME}`,
	description: `API Description`,
};

export default async function AdminApiPage() {
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
