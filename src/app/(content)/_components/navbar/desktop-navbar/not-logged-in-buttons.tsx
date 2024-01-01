'use client';

import { User } from '@supabase/supabase-js';
import { Route } from 'next';
import { useParams } from 'next/navigation';
import DesktopNavbarLink from './desktop-navbar-link';

const NotLoggedInButtons = ({ user }: { user: User | null }) => {
  const params = useParams();
  const redirectUrlParam = params.slug ? `?redirectUrl=/trainers/${params.slug}` : '';

  return (
    <>
      {!user && (
        <>
          <DesktopNavbarLink href={`/login${redirectUrlParam}` as Route} icon="login">
            Zaloguj się
          </DesktopNavbarLink>
          <DesktopNavbarLink href={`/register/client${redirectUrlParam}` as Route} icon="register">
            Zarejestruj się
          </DesktopNavbarLink>
        </>
      )}
    </>
  );
};

export default NotLoggedInButtons;
