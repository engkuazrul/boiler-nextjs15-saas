// return hello world
import { NextResponse, NextRequest } from "next/server";
import { isValidAPIKey } from "@/lib/crypto";

export async function GET(req: NextRequest) {
	const apiKey = req.headers.get("Authorization") as string;

	if (!apiKey) {
		return new NextResponse("Missing API Key", { status: 401 });
	}

	const isValid = await isValidAPIKey(apiKey, "USER");

	if (!isValid) {
		return new NextResponse("In valid API Key", { status: 401 });
	}

	return NextResponse.json({
		name: "John Doe",
		description: "User example api",
	});
}
