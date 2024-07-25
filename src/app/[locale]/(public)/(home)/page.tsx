import { Suspense } from 'react';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import AuthFooter from '@/app/[locale]/(auth)/_components/auth-footer';
import PublicContainer from '@/app/[locale]/(public)/_components/public-container';
import PublicNavbarPlaceholder from '@/app/[locale]/(public)/_components/public-navbar-placeholder';
import AppButton from '@/components/app-button';
import AppLogo from '@/components/app-logo';
import { TrainerCardsSkeletons } from '@/components/trainer-card';
import Trainers from '@/components/trainers';
import Constants, { Locale } from '@/utils/constants';
import HomeArrow from './_assets/home-arrow';
import { appBenefitsIcons, appBenefitsKeys, heroBenefits } from './data';

const Navbar = () => {
  const t = useTranslations();

  return (
    <>
      <header className="fixed top-0 z-50 hidden h-[--public-navbar-height] w-full items-center justify-center border-b border-gray-600 bg-shark px-5 lg:flex">
        <div className="flex w-full max-w-screen-xl items-center justify-between">
          <AppLogo className="w-[100px]" href="/" />
          <div className="flex gap-2.5">
            <AppButton color="secondary" href="/how-it-works" LinkComponent={Link} size="small" variant="text">
              {t('HOME_HOW_IT_WORKS')}
            </AppButton>
            <AppButton href="/submissions" LinkComponent={Link} size="small" variant="contained">
              {t('PUBLIC_NAVBAR_GO_TO_APP_BUTTON')} {Constants.APP_NAME}
            </AppButton>
          </div>
        </div>
      </header>
      <PublicNavbarPlaceholder className="hidden lg:block" />
      <header className="flex h-[--public-navbar-height] w-full items-center justify-center px-5 lg:hidden">
        <div className="flex w-full max-w-screen-xl items-center justify-between">
          <AppLogo className="w-[100px]" href="/" />
          <AppButton color="secondary" href="/submissions" LinkComponent={Link} size="small" variant="contained">
            {t('PUBLIC_NAVBAR_GO_TO_APP_BUTTON')} {Constants.APP_NAME}
          </AppButton>
        </div>
      </header>
    </>
  );
};

const HomePage = ({ params: { locale } }: { params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  return (
    <>
      <div className="min-h-screen-responsive relative z-0 flex flex-col overflow-x-hidden text-white">
        <Navbar />
        <HomeArrow className="absolute right-0 z-0 hidden h-auto translate-x-[10%] translate-y-[-10%] xl:block xl:w-[800px]" />
        <Image
          alt={t('HOME_HERO_IMAGE_ALT')}
          className="absolute right-[20px] top-[120px] z-[1] hidden xl:block xl:w-[850px]"
          height={1083}
          src={`/home/main-section-mock-desktop-${locale}.png`}
          width={1148}
        />
        <PublicContainer className="z-[1] mb-10 pt-10 xl:mb-0 xl:pt-24 2xl:pt-48">
          <PublicContainer.Content className="grow flex-col md:grow-0 xl:grow xl:items-start">
            <div className="mb-10 flex max-w-[360px] flex-col gap-5 lg:max-w-[600px] xl:mb-10 xl:max-w-[750px] xl:text-start">
              <h1 className="text-3xl font-bold lg:text-5xl xl:text-6xl">{t.rich('HOME_HERO_TITLE')}</h1>
              <div className="flex flex-col gap-1 text-sm lg:text-base xl:text-xl">
                {heroBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 font-medium">
                    <CheckCircleOutlineRoundedIcon className="text-yellow-400" />
                    <p>{t(`HOME_HERO_BENEFITS_${benefit}`)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <AppButton classes={{ root: 'py-3 xl:px-[40px] xl:text-xl' }} component={Link} href="/trainers">
                {t('HOME_HERO_CHECK_TRAINERS_CTA')}
              </AppButton>
            </div>
          </PublicContainer.Content>
        </PublicContainer>

        <section className="px-5 xl:hidden">
          <Image
            alt={t('HOME_HERO_IMAGE_ALT')}
            height={600}
            src={`/home/main-section-mock-desktop-${locale}.png`}
            width={636}
          />
        </section>

        <PublicContainer>
          <PublicContainer.Content className="flex-col gap-10 py-10 lg:gap-14 xl:py-[60px] xl:pt-60">
            <h3 className="text-center text-3xl font-bold lg:text-4xl">
              {t('HOME_BENEFITS_TITLE')} <span className="font-bold text-yellow-400">{Constants.APP_NAME}</span>?
            </h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {appBenefitsKeys.map((key) => {
                const Icon = appBenefitsIcons[key];

                return (
                  <div key={key} className="flex flex-col items-center gap-2.5">
                    <div className="flex size-[184px] flex-col items-center  justify-center gap-2.5 rounded-full border border-yellow-400 bg-shark p-2 text-base lg:size-60 lg:p-8 lg:text-xl">
                      <Icon className="size-12 text-xl lg:size-[70px]" />
                      <span className="text-center font-bold">{t(`HOME_BENEFITS_TITLE_${key}`)}</span>
                    </div>
                    <p className="max-w-80 text-center">{t.rich(`HOME_BENEFITS_DESCRIPTION_${key}`)}</p>
                  </div>
                );
              })}
            </div>
          </PublicContainer.Content>
        </PublicContainer>

        <PublicContainer>
          <PublicContainer.Content className="flex flex-col gap-10 pt-10 lg:gap-14 lg:py-20">
            <h3 className="text-center text-3xl font-bold lg:text-4xl">{t('HOME_TRAINERS_TITLE')}</h3>
            <Suspense fallback={<TrainerCardsSkeletons length={6} />}>
              <Trainers />
            </Suspense>
          </PublicContainer.Content>
        </PublicContainer>

        <PublicContainer className="z-[2] py-10 xl:py-20">
          <PublicContainer.Content className="flex-col items-center justify-between xl:flex-row xl:gap-24">
            <div className="relative xl:ml-10 xl:rotate-[10deg]">
              <Image
                alt={`${t('HOME_REPORTS_ALT')} ${Constants.APP_NAME}`}
                className="h-[450px] w-full object-cover sm:h-[50vh] xl:h-[750px]"
                height={1520 * 0.75}
                quality={100}
                src={`/home/section-edit-${locale}.png`}
                width={817 * 0.75}
              />
              <div className="section-profile-gradient absolute inset-0 xl:hidden" />
            </div>
            <div className="sm:-mt-18 z-[1] -mt-10 flex max-w-sm flex-col items-start	lg:text-left xl:max-w-md">
              <h3 className="mb-2.5 text-4xl font-bold md:text-5xl lg:mb-5 xl:text-6xl">
                {t.rich('HOME_REPORTS_TITLE')}
              </h3>
              <p className="mb-5 text-sm md:text-base lg:mb-10">{t('HOME_REPORTS_DESCRIPTION')}</p>
              <AppButton component={Link} href="/how-it-works">
                {t.rich('HOME_HOW_IT_WORKS')}
              </AppButton>
            </div>
          </PublicContainer.Content>
        </PublicContainer>

        <PublicContainer className="relative bg-yellow-400 pb-10 pt-10 md:pb-0">
          <PublicContainer.Content className="items-center sm:justify-center md:justify-between">
            <div className="hidden h-[300px] overflow-hidden md:block lg:h-[500px]">
              <HomeArrow className="h-auto w-[300px] lg:w-[480px] xl:w-[580px] [&_path]:fill-bunker" />
            </div>
            <div className="max-w-sm text-bunker lg:max-w-[26rem] xl:max-w-[39rem]">
              <h3 className="mb-2.5 text-4xl font-bold lg:mb-5 lg:text-5xl xl:text-6xl">
                {t.rich('HOME_CONTACT_TITLE')}
              </h3>
              <p className="mb-5 text-sm lg:mb-10 xl:text-base xl:font-semibold">{t('HOME_CONTACT_DESCRIPTION')}</p>
              <AppButton color="secondary" component={Link} href="/contact">
                {t('HOME_CONTACT_CTA')}
              </AppButton>
            </div>
          </PublicContainer.Content>
        </PublicContainer>
        <PublicContainer>
          <PublicContainer.Content className="gap-5 py-5 ">
            <AuthFooter />
          </PublicContainer.Content>
        </PublicContainer>
      </div>
      <div className="sticky bottom-0 flex justify-center border-t border-gray-500 bg-shark lg:hidden">
        <AppButton
          fullWidth
          className="rounded-none py-2.5"
          color="secondary"
          component={Link}
          href="/how-it-works"
          size="small"
          variant="text"
        >
          {t.rich('HOME_HOW_IT_WORKS')}
        </AppButton>
      </div>
    </>
  );
};

export default HomePage;
