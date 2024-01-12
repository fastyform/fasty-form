import Image from 'next/image';
import Link from 'next/link';
import DesktopBackgroundHomeIcon from '@/assets/desktop-background-home-icon';
import MobileBackgroundHomeIcon from '@/assets/mobile-background-home-icon';
import AppButton from '@/components/app-button';
import AppLogo from '@/components/app-logo';
import AuthFooter from './(auth)/_components/auth-footer';

const HomePage = () => (
  <div className="min-h-screen-responsive flex flex-col">
    <MobileBackgroundHomeIcon className="fixed left-0 top-0 z-10 fill-yellow-400/30 xl:hidden" />
    <DesktopBackgroundHomeIcon className="fixed right-0 top-0 z-10 hidden fill-yellow-400 xl:block" />
    <div className="z-20 ml-auto mr-auto flex w-full max-w-screen-2xl flex-col">
      <div className="min-h-screen-responsive flex flex-col items-center justify-center gap-10 py-5 xl:max-w-2xl xl:items-start xl:px-5 2xl:max-w-3xl">
        <AppLogo />
        <div className="flex max-w-md flex-col gap-2.5 px-5 text-center text-white md:max-w-2xl xl:z-20 xl:gap-5 xl:px-0 xl:text-start">
          <h1 className="text-2xl font-bold md:text-4xl xl:text-6xl 2xl:text-7xl">
            Zarabiaj jako <span className="text-yellow-400">trener</span> na analizie techniki swoich{' '}
            <span className="text-yellow-400">klientów</span> z FastyForm!
          </h1>
          <p className="md:text-xl xl:text-2xl">
            Dołącz do zaufanego grona trenerów,
            <br /> udostępniaj, analizuj, zarabiaj!
          </p>
        </div>
        <AppButton href="/submissions" LinkComponent={Link}>
          Przejdź do FastyForm
        </AppButton>
        <div className="relative right-0 aspect-[1.09] w-full max-w-md overflow-hidden md:aspect-[1.47] xl:absolute xl:bottom-0  xl:z-10 xl:max-w-5xl">
          <Image
            fill
            alt="Zdjęcie przedstawiające aplikację FastyForm"
            className="absolute right-0 top-0 translate-x-1/4 min-[448px]:translate-x-0 md:hidden"
            quality={100}
            src="/mobile-home-image.png"
          />
          <Image
            fill
            alt="Zdjęcie przedstawiające aplikację FastyForm"
            className="absolute right-0 top-0 hidden md:block xl:translate-x-[15%]"
            quality={100}
            src="/desktop-home-image.png"
          />
        </div>
        <AuthFooter />
      </div>
    </div>
  </div>
);

export default HomePage;
