import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import AuthFooter from '@/app/[locale]/(auth)/_components/auth-footer';
import ErrorIcon from '@/assets/error-icon';
import AppButton from '@/components/app-button';
import { Locale } from '@/utils/constants';
import ResendEmailForm from './resend-email-form';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale });

  return {
    title: t('EMAIL_VERIFICATION_ERROR_PAGE_METADATA_TITLE'),
    description: t('EMAIL_VERIFICATION_ERROR_PAGE_METADATA_DESCRIPTION'),
  };
}
const EmailVerificationErrorPage = ({ params: { locale } }: { params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <div className="bg-custom-radial flex min-h-[inherit] flex-col items-center justify-center gap-10 px-10 py-5 text-center md:gap-16">
      <div className="my-auto flex w-full max-w-[400px] flex-col items-center justify-center gap-5">
        <ErrorIcon className="text-[60px]" height={100} width={100} />
        <h1 className="text-2xl font-bold text-white md:text-3xl">{t.rich('EMAIL_VERIFICATION_ERROR_TITLE')}</h1>
        <p className="text-white">{t.rich('EMAIL_VERIFICATION_ERROR_DESCRIPTION')}</p>
        <ResendEmailForm />
        <AppButton fullWidth color="secondary" href="/login" size="large" variant="text">
          {t('EMAIL_VERIFICATION_ERROR_LOGIN_REDIRECT')}
        </AppButton>
      </div>
      <AuthFooter className="pt-10" />
    </div>
  );
};

export default EmailVerificationErrorPage;
