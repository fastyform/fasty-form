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
    title: t('REGISTER_TRAINER_PAGE_METADATA_TITLE'),
    description: t('REGISTER_TRAINER_PAGE_METADATA_DESCRIPTION'),
  };
}

const RegisterTrainerPage = ({
  searchParams,
  params: { locale },
}: {
  searchParams: SearchParams;
  params: { locale: Locale };
}) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  return (
    <SplitPageWithImage imageProps={{ alt: t('REGISTER_TRAINER_IMAGE_ALT'), src: '/trainer-register.jpg' }}>
      <div className="flex flex-col gap-2.5 text-center">
        <h1 className="text-2xl text-white">{t.rich('REGISTER_TRAINER_HEADING')}</h1>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-white">{t.rich('REGISTER_TRAINER_TITLE')}</h2>
        <RegisterForm locale={locale} redirectPathParam={searchParams.redirectUrl} userRole="trainer" />
      </div>
      <div className="flex flex-col gap-2">
        <AuthLink href="/login" redirectUrlParam={searchParams.redirectUrl}>
          {t.rich('REGISTER_LOGIN_REDIRECT')}
        </AuthLink>
      </div>
    </SplitPageWithImage>
  );
};

export default RegisterTrainerPage;
