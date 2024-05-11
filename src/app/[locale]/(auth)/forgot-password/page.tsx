import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import SplitPageWithImage from '@/app/[locale]/(auth)/_components/split-page-with-image';
import AuthLink from '@/components/auth-link';
import { Locale } from '@/utils/constants';
import { SearchParams } from '@/utils/types';
import ForgotPasswordForm from './forgot-password-form';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale });

  return {
    title: t('FORGOT_PAGE_METADATA_TITLE'),
    description: t('FORGOT_PAGE_METADATA_DESCRIPTION'),
  };
}

const ForgotPasswordPage = ({
  searchParams,
  params: { locale },
}: {
  searchParams: SearchParams;
  params: { locale: Locale };
}) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <SplitPageWithImage imageProps={{ alt: 'Hantle na siłowni', src: '/forgot-password.png' }}>
      <h1 className="text-2xl font-bold text-white">{t('FORGOT_PASSWORD_TITLE')}</h1>

      <ForgotPasswordForm redirectPathParam={searchParams.redirectUrl} />
      <AuthLink href="/login" redirectUrlParam={searchParams.redirectUrl}>
        {t.rich('FORGOT_LOGIN_REDIRECT')}
      </AuthLink>
    </SplitPageWithImage>
  );
};

export default ForgotPasswordPage;
