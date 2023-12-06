import { type CookieOptions } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/utils/supabase/client';
import checkIsTrainerAccount from './utils/check-is-trainer-account';
import getTrainerDetailsById from './utils/get-trainer-details-by-id';

const PROTECTED_ROUTES = ['/submissions', '/settings', '/onboarding', '/edit-profile', '/stripe'];
const UNAVAILABLE_ROUTES = ['/login', '/register'];

export const middleware = async (request: NextRequest) => {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = getSupabase({
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options });
        response = NextResponse.next({ request: { headers: request.headers } });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: '', ...options });
        response = NextResponse.next({ request: { headers: request.headers } });
        response.cookies.set({ name, value: '', ...options });
      },
    },
  });

  const { data } = await supabase.auth.getSession();

  if (data.session) {
    const isTrainerAccount = await checkIsTrainerAccount(data.session.user.id);
    const trainerDetails = isTrainerAccount ? await getTrainerDetailsById(data.session.user.id) : undefined;
    const isOnboarded = trainerDetails ? trainerDetails.is_onboarded : true;

    if (!isOnboarded && request.nextUrl.pathname !== '/onboarding') {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }

    if (isOnboarded && request.nextUrl.pathname === '/onboarding') {
      return NextResponse.redirect(new URL('/submissions', request.url));
    }
  }

  if (data.session && UNAVAILABLE_ROUTES.some((route) => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/submissions', request.url));
  }

  if (!data.session && PROTECTED_ROUTES.some((route) => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
