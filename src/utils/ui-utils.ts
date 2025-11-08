import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function validateEmail(email: string) {
	return email.match(
		// eslint-disable-next-line no-useless-escape
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
}

export function excludeFields<
	T extends Record<string, unknown>,
	K extends keyof T,
>(record: T, keys: K[]) {
	return Object.fromEntries(
		Object.entries(record).filter(([key]) => !keys.includes(key as K))
	) as Omit<T, K>;
}

