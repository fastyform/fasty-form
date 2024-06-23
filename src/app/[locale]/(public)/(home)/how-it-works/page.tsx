import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { twJoin } from 'tailwind-merge';
import AuthFooter from '@/app/[locale]/(auth)/_components/auth-footer';
import One from '@/app/[locale]/(public)/(home)/_assets/one';
import Three from '@/app/[locale]/(public)/(home)/_assets/three';
import Two from '@/app/[locale]/(public)/(home)/_assets/two';
import PublicContainer from '@/app/[locale]/(public)/_components/public-container';
import PublicNavbar from '@/app/[locale]/(public)/_components/public-desktop-navbar';
import PublicNavbarPlaceholder from '@/app/[locale]/(public)/_components/public-navbar-placeholder';
import AppButton from '@/components/app-button';
import Constants, { Locale } from '@/utils/constants';
import FaqAccordion from './faq-accordion';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale });

  return {
    title: t('HOW_IT_WORKS_METADATA_TITLE', { appName: Constants.APP_NAME }),
    description: t('HOW_IT_WORKS_METADATA_DESCRIPTION', { appName: Constants.APP_NAME }),
  };
}

const stepsData = {
  one: [One, 'sm:ml-0'],
  two: [Two, 'sm:ml-[10vw] xl:ml-[6vw]'],
  three: [Three, 'sm:ml-[20vw] xl:ml-[12vw]'],
} as const;
const stepsDataKeys = Object.keys(stepsData) as (keyof typeof stepsData)[];

const HowItWorksPage = ({ params: { locale } }: { params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-10 text-white xl:gap-20">
      <PublicNavbar />
      <PublicNavbarPlaceholder />
      <PublicContainer>
        <PublicContainer.Content className="flex-col gap-10 xl:flex-row xl:gap-0">
          <div className="flex grow flex-col gap-10">
            <div className="flex max-w-md flex-col items-start gap-5 xl:max-w-xl">
              <h1 className="text-5xl font-bold xl:text-7xl">{t('HOW_IT_WORKS_TITLE')}</h1>
              <p className="xl:text-lg">{t('HOW_IT_WORKS_DESCRIPTION')}</p>
              <AppButton component={Link} href="/register/trainer">
                {t('HOW_IT_WORKS_REGISTER_CTA')}
              </AppButton>
            </div>
            {stepsDataKeys.map((key) => {
              const [Number, className] = stepsData[key];

              return (
                <div key={key} className={twJoin('relative -ml-20 flex sm:translate-x-0 xl:block', className)}>
                  <Number className="h-[200px] basis-[231px] opacity-60 sm:h-[230px] xl:h-[330px]" height={330} />
                  <div
                    key={key}
                    className="absolute left-[7.5rem] top-1/2 flex -translate-y-1/2 flex-col gap-2.5 sm:gap-5"
                  >
                    <p className="text-3xl font-bold xl:text-4xl">{t.rich(`HOW_IT_WORKS_STEPS_TITLE_${key}`)}</p>
                    <p className="max-w-96 text-sm xl:text-base">{t.rich(`HOW_IT_WORKS_STEPS_DESCRIPTION_${key}`)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <Image
            alt={`${Constants.APP_NAME} - ${t('HOW_IT_WORKS_ONBOARDING_MOBILE_ALT')}`}
            className="w-[241px] self-center xl:sticky xl:top-36 xl:w-[337px] xl:self-start"
            height={1520 * 0.5}
            quality={100}
            src={`/home/iphone-app-onboarding-${locale}.png`}
            width={817 * 0.5}
          />
        </PublicContainer.Content>
      </PublicContainer>
      <PublicContainer>
        <PublicContainer.Content className="flex-wrap gap-10">
          <h1 className="text-5xl font-bold xl:text-5xl">{t('HOW_IT_WORKS_FAQ_TITLE')}</h1>
          <FaqAccordion />
        </PublicContainer.Content>
      </PublicContainer>
      <PublicContainer>
        <PublicContainer.Content className="gap-5 py-5 ">
          <AuthFooter />
        </PublicContainer.Content>
      </PublicContainer>
    </div>
  );
};

export default HowItWorksPage;
