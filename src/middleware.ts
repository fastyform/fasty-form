import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const restrictedPaths = ['/client/orders'];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (restrictedPaths.includes(req.nextUrl.pathname) && !user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}
