import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import SplitPageWithImage from '@/app/[locale]/(auth)/_components/split-page-with-image';
import AuthLink from '@/components/auth-link';
import { Locale } from '@/utils/constants';
import { SearchParams } from '@/utils/types';
import LoginForm from './_components/login-form';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale });

  return {
    title: t('LOGIN_PAGE_METADATA_TITLE'),
    description: t('LOGIN_PAGE_METADATA_DESCRIPTION'),
  };
}

const LoginPage = ({
  searchParams,
  params: { locale },
}: {
  searchParams: SearchParams;
  params: { locale: Locale };
}) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <SplitPageWithImage imageProps={{ alt: t('LOGIN_IMAGE_ALT'), src: '/login.jpg', className: 'opacity-60' }}>
      <h1 className="text-2xl font-bold text-white">{t('LOGIN_PAGE_TITLE')}</h1>
      <div className="flex flex-col gap-4">
        <LoginForm redirectUrlParam={searchParams.redirectUrl} />
        <AuthLink href="/register/client" redirectUrlParam={searchParams.redirectUrl}>
          {t.rich('LOGIN_REGISTER_REDIRECT')}
        </AuthLink>
      </div>
    </SplitPageWithImage>
  );
};

export default LoginPage;
