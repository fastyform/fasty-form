import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import SplitPageWithImage from '@/app/[locale]/(auth)/_components/split-page-with-image';
import RegisterForm from '@/app/[locale]/(auth)/register/register-form';
import AuthLink from '@/components/auth-link';
import { Locale } from '@/utils/constants';
import { SearchParams } from '@/utils/types';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale });

  return {
    title: t('REGISTER_CLIENT_PAGE_METADATA_TITLE'),
    description: t('REGISTER_CLIENT_PAGE_METADATA_DESCRIPTION'),
  };
}

const RegisterClientPage = ({
  searchParams,
  params: { locale },
}: {
  searchParams: SearchParams;
  params: { locale: Locale };
}) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  const isPurchaseFlow = searchParams.purchase === 'true';

  return (
    <SplitPageWithImage imageProps={{ alt: t('REGISTER_CLIENT_IMAGE_ALT'), src: '/client-register.jpg' }}>
      <div className="flex flex-col gap-2.5 text-center">
        <h1 className="text-2xl text-white">{t.rich('REGISTER_CLIENT_HEADING')}</h1>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-white">
          {t.rich(isPurchaseFlow ? 'REGISTER_CLIENT_TITLE_PURCHASE_FLOW' : 'REGISTER_CLIENT_TITLE')}
        </h2>
        <RegisterForm locale={locale} redirectPathParam={searchParams.redirectUrl} userRole="client" />
      </div>
      <div className="flex flex-col gap-2">
        <AuthLink href="/login" isPurchaseFlow={isPurchaseFlow} redirectUrlParam={searchParams.redirectUrl}>
          {t.rich('REGISTER_LOGIN_REDIRECT')}
        </AuthLink>
      </div>
    </SplitPageWithImage>
  );
};

export default RegisterClientPage;
