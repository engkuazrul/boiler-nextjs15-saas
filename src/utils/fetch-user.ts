export async function getUpdatedUserData(email: string) {
	try {
		const res = await fetch(
			`/api/user/fetch-user?email=${encodeURIComponent(email)}`
		);

		return await res.json();
	} catch (error) {
		return null;
	}
}

