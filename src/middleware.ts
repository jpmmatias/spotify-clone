import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middlware(req: NextRequest) {
	const token = req.cookies.get('TRAX_ACCESS_TOKEN');

	if (!token) {
		return NextResponse.redirect(new URL('/sign-in', req.url));
	}
}

export const config = {
	matcher: ['/', '/playlists/:path*', '/libary/:path*'],
};
