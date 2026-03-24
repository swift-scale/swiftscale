import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except login/password related pages)
  if (pathname.startsWith('/admin') && 
      !pathname.startsWith('/admin/login') && 
      !pathname.startsWith('/admin/forgot-password') && 
      !pathname.startsWith('/admin/reset-password')) {
    
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    // In a real app, you might want to verify the token here 
    // using a library like 'jose' which works in Edge runtime.
    // For now, we'll verify existence to ensure basic protection.
  }

  // If already logged in, don't show login or recovery pages
  const recoveryPages = ['/admin/login', '/admin/forgot-password', '/admin/reset-password'];
  if (recoveryPages.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
