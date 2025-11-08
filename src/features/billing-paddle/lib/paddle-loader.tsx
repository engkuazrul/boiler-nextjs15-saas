"use client";
import Script from "next/script";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

interface PaddleEvent {
	name: string;
	data: {
		status?: string;
		customer?: {
			email?: string;
		};
	};
}

interface PaddleInstance {
	Environment: {
		set: (env: string) => void;
	};
	Initialize: (config: {
		token?: string;
		eventCallback: (event: PaddleEvent) => void;
	}) => void;
	Checkout?: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		open: (config: any) => void;
	};
}

declare global {
	interface Window {
		Paddle: PaddleInstance;
	}
}

export function PaddleLoader() {
	const loadPaddle = () => {
		if (typeof window !== "undefined") {
			window?.Paddle?.Environment.set("sandbox");
			window.Paddle.Initialize({
				token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
				eventCallback: function (event: PaddleEvent) {
					if (
						event.name === "checkout.completed" &&
						event.data.status === "completed"
					) {
						signIn("fetchSession", {
							email: event.data.customer?.email,
							redirect: false,
						}).then((callback) => {
							if (callback?.error) {
								toast.error(callback.error);
							}

							if (callback?.ok && !callback?.error) {
								toast.success("Subcription created successfully");
							}
						});
					}
				},
			});
		}
	};

	return (
		<Script
			src='https://cdn.paddle.com/paddle/v2/paddle.js'
			onLoad={() => {
				loadPaddle();
			}}
		/>
	);
}
