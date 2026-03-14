import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    status: 'success',
    message: 'Logged out successfully'
  });

  // Clear the cookie
  response.cookies.set('admin-token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}
