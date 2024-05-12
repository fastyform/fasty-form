'use client';

import { User } from '@supabase/supabase-js';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import NavbarLink from '@/components/app-navbar/navbar-link';

const NotLoggedInButtons = ({ user, isHomePage }: { user: User | null; isHomePage?: boolean }) => {
  const t = useTranslations();
  const params = useParams();
  const redirectUrlParam = params.slug ? `?redirectUrl=/trainers/${params.slug}` : '';

  return (
    <>
      {!user && (
        <>
          <NavbarLink href={`/login${redirectUrlParam}`} icon={isHomePage ? undefined : 'login'}>
            {t('COMMON_LOGIN_CTA')}
          </NavbarLink>
          <NavbarLink
            href={`/register/client${redirectUrlParam}`}
            icon={isHomePage ? undefined : 'register'}
            variant="contained"
          >
            {t('COMMON_REGISTER_CTA')}
          </NavbarLink>
        </>
      )}
    </>
  );
};

export default NotLoggedInButtons;
