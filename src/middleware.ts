import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    const role = request.cookies.get('admin_role')?.value;
    const decodedRole = role ? decodeURIComponent(role) : null;
    
    if (decodedRole === '执笔者' && (
      request.nextUrl.pathname.startsWith('/admin/channels') || 
      request.nextUrl.pathname.startsWith('/admin/settings')
    )) {
      return NextResponse.redirect(new URL('/admin/content', request.url))
    }
  }
}

export const config = {
  matcher: '/admin/:path*',
}
