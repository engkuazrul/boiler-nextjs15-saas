import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
	return bcrypt.hash(password, 10);
}

export async function isValidAPIKey(apiKey: string, role: string) {
	const key = role as string;
	const isValidKey = await bcrypt.compare(key, apiKey);
	return isValidKey;
}

