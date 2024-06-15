import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
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
    <div className="flex flex-col text-white">
      <PublicNavbar />
      <PublicNavbarPlaceholder />
      <PublicContainer className="my-10">
        <PublicContainer.Content className="flex-col justify-between gap-10 xl:flex-row xl:items-center xl:gap-0">
          <div className="flex grow flex-col gap-10">
            <div className="flex max-w-md flex-col items-start gap-5 xl:max-w-xl">
              <h1 className="text-5xl font-bold xl:text-7xl">{t('HOW_IT_WORKS_TITLE')}</h1>
              <p className="xl:text-lg">{t('HOW_IT_WORKS_DESCRIPTION')}</p>
              <AppButton className="xl:hidden" component={Link} href="/register/trainer">
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
                    className="absolute left-[7.5rem] top-1/2 flex -translate-y-1/2 flex-col gap-2.5  sm:gap-5"
                  >
                    <p className="text-4xl font-bold xl:text-6xl">{t.rich(`HOW_IT_WORKS_STEPS_TITLE_${key}`)}</p>
                    <p className="max-w-96 text-sm xl:text-base">{t.rich(`HOW_IT_WORKS_STEPS_DESCRIPTION_${key}`)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="hidden xl:block xl:w-[337px]" />
          <div className="flex justify-center xl:fixed xl:bottom-[120px] xl:left-0 xl:right-0 xl:top-[120px] xl:px-5">
            <div className="flex max-w-screen-xl grow justify-center xl:justify-end">
              <div className="flex flex-col gap-5">
                <Image
                  alt={`${Constants.APP_NAME} - ${t('HOW_IT_WORKS_ONBOARDING_MOBILE_ALT')}`}
                  className="xl:self-[unset] w-[241px] self-center xl:w-[337px]"
                  height={1520 * 0.5}
                  quality={100}
                  src={`/home/iphone-app-onboarding-${locale}.png`}
                  width={817 * 0.5}
                />
                <AppButton className="mx-5 hidden xl:flex" component={Link} href="/register/trainer">
                  {t('HOW_IT_WORKS_REGISTER_CTA')}
                </AppButton>
              </div>
            </div>
          </div>
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
