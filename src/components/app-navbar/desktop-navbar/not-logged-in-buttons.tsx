'use client';

import { User } from '@supabase/supabase-js';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import NavbarLink from '@/components/app-navbar/navbar-link';

const NotLoggedInButtons = ({ user }: { user: User | null }) => {
  const t = useTranslations();
  const params = useParams();
  const redirectUrlParam = params.slug ? `?redirectUrl=/trainers/${params.slug}` : '';

  return (
    <>
      {!user && (
        <>
          <NavbarLink href={`/login${redirectUrlParam}`} icon="login">
            {t('COMMON_LOGIN_CTA')}
          </NavbarLink>
          <NavbarLink
            className="hidden lg:flex"
            href={`/register/client${redirectUrlParam}`}
            icon="register"
            variant="contained"
          >
            {t('COMMON_REGISTER_CTA')}
          </NavbarLink>
          <NavbarLink className="lg:hidden" href={`/register/client${redirectUrlParam}`} icon="register">
            {t('COMMON_REGISTER_CTA')}
          </NavbarLink>
        </>
      )}
    </>
  );
};

export default NotLoggedInButtons;
