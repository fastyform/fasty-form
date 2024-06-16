import { Metadata } from 'next';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import PublicNavbar from '@/app/[locale]/(public)/_components/public-desktop-navbar';
import PublicNavbarPlaceholder from '@/app/[locale]/(public)/_components/public-navbar-placeholder';
import { Locale } from '@/utils/constants';

const steps = ['check', 'discover', 'buy'] as const;

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale });

  return {
    title: t('CLIENT_PAGE_META_TITLE'),
    description: t('REGISTER_CLIENT_PAGE_METADATA_DESCRIPTION'),
  };
}

const ClintPage = ({ params: { locale } }: { params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  return (
    <div className="min-h-screen-responsive relative z-0 flex flex-col justify-center overflow-x-hidden px-5 py-10 text-white">
      <PublicNavbar />
      <PublicNavbarPlaceholder />
      <Image fill alt="" className="-z-10 object-cover object-left opacity-5" src="/client/client-background.png" />
      <div className="mx-auto flex w-full max-w-xl flex-col gap-10 xl:max-w-screen-xl xl:gap-20">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-semibold xl:text-6xl">{t.rich('CLIENT_PAGE_TITLE')}</h1>
          <p className="text-xl font-medium xl:text-2xl">{t('CLIENT_PAGE_DESCRIPTION')}</p>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-xl xl:text-xl">{t('CLIENT_PAGE_DESCRIPTION_START')}</p>
          <div className="flex max-w-3xl flex-col flex-wrap gap-2.5 xl:flex-row xl:gap-5">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-2.5 xl:max-w-[340px]">
                <span className="w-10 text-5xl">{index + 1}. </span>
                <p className="flex-1 text-sm xl:text-base">{t(`CLIENT_PAGE_STEP_${step}`)}</p>
              </div>
            ))}
          </div>
        </div>
        <Image
          alt={t('CLIENT_PAGE_APP_IMAGE_ALT')}
          className="mx-auto xl:hidden"
          height={433}
          src={`/client/client-app-image-mobile-${locale}.png`}
          width={390}
        />
        <Image
          alt={t('CLIENT_PAGE_APP_IMAGE_ALT')}
          className="absolute bottom-0 right-0 hidden xl:block"
          height={700}
          src={`/client/client-app-image-desktop-${locale}.png`}
          width={628}
        />
      </div>
    </div>
  );
};

export default ClintPage;
