import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req: NextRequestWithAuth) {
		const pathname = req.nextUrl?.pathname;
		const isAdmin = req.nextauth.token?.role === "ADMIN";
		const isUser = req.nextauth.token?.role === "USER";

		// Admin trying to access admin routes - allow
		if (pathname.includes("/admin") && isAdmin) {
			return NextResponse.next();
		}

		// Admin trying to access user routes - redirect to admin dashboard
		if (pathname.includes("/user") && isAdmin) {
			return NextResponse.redirect(new URL("/admin", req.url));
		}

		// Non-admin trying to access admin routes - redirect to user dashboard
		if (pathname.includes("/admin") && !isAdmin) {
			return NextResponse.redirect(new URL("/user", req.url));
		}

		// User trying to access user routes - allow
		if (pathname.includes("/user") && isUser) {
			return NextResponse.next();
		}

		// Fallback - redirect to signin if no valid role
		return NextResponse.redirect(new URL("/auth/signin", req.url));
	},
	{
		secret: process.env.SECRET,
		callbacks: {
			authorized: (params) => {
				const { token } = params;
				return !!token;
			},
		},
	}
);

export const config = {
	matcher: ["/user/:path*", "/admin/:path*"],
};
