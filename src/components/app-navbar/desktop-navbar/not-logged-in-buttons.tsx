'use client';

import { User } from '@supabase/supabase-js';
import { Route } from 'next';
import { useParams } from 'next/navigation';
import NavbarLink from '@/components/app-navbar/navbar-link';

const NotLoggedInButtons = ({ user, isHomePage }: { user: User | null; isHomePage?: boolean }) => {
  const params = useParams();
  const redirectUrlParam = params.slug ? `?redirectUrl=/trainers/${params.slug}` : '';

  return (
    <>
      {!user && (
        <>
          <NavbarLink href={`/login${redirectUrlParam}` as Route} icon={isHomePage ? undefined : 'login'}>
            Zaloguj się
          </NavbarLink>
          <NavbarLink
            href={`/register/client${redirectUrlParam}` as Route}
            icon={isHomePage ? undefined : 'register'}
            variant="contained"
          >
            Zarejestruj się
          </NavbarLink>
        </>
      )}
    </>
  );
};

export default NotLoggedInButtons;
