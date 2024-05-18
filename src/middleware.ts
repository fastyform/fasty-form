import { type CookieOptions } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { getSupabase } from '@/utils/supabase/client';
import { DEFAULT_LOCALE, LOCALES, PROTECTED_ROUTES, UNAVAILABLE_ROUTES_FOR_LOGGED_IN_USERS } from './utils/constants';

const handleI18nRouting = createIntlMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'never',
});

export const middleware = async (request: NextRequest) => {
  const response = handleI18nRouting(request);

  const supabase = getSupabase({
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: '', ...options });
        response.cookies.set({ name, value: '', ...options });
      },
    },
  });

  try {
    const { data, error } = await supabase.auth.getUser();

    if (
      data.user &&
      UNAVAILABLE_ROUTES_FOR_LOGGED_IN_USERS.some((route) => request.nextUrl.pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL('/submissions', request.url));
    }

    if (!data.user && PROTECTED_ROUTES.some((route) => request.nextUrl.pathname.startsWith(route))) {
      if (error) {
        await supabase.auth.signOut();
      }

      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    console.error(error);
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
     * - *.svg (SVG files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
