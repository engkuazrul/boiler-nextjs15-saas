"use server";

import { headers } from "next/headers";

const trackers: Record<string, { count: number; expiresAt: number }> = {};

async function getIp() {
	const headersList = await headers();

	const forwardedFor = headersList.get("x-forwarded-for");
	const realIp = headersList.get("x-real-ip");

	if (forwardedFor) {
		return forwardedFor.split(",")[0].trim();
	}

	if (realIp) {
		return realIp.trim();
	}

	return null;
}

export async function rateLimitByIp(limit = 1, windowMs = 10000) {
	const ip = await getIp();

	console.log(trackers);

	if (!ip) {
		throw new Error("IP address not found");
	}

	const tracker = trackers[ip] || { count: 0, expiresAt: 0 };

	if (!trackers[ip]) {
		trackers[ip] = tracker;
	}

	if (tracker.expiresAt < Date.now()) {
		tracker.count = 0;
		tracker.expiresAt = Date.now() + windowMs;
	}

	tracker.count++;

	if (tracker.count > limit) {
		throw new Error("Rate limit exceeded");
	}
}
