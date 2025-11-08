import React from "react";
import CreateToken from "./create-token";
import TokenList from "./token-list";
import { getApiKeys } from "@/features/user/actions/api-key";

const APIKey = async () => {
	const tokens = await getApiKeys();

	return (
		<>
			<CreateToken />
			<TokenList tokens={tokens} />
		</>
	);
};

export default APIKey;
