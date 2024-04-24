import Image from 'next/image';
import Link from 'next/link';
import { unstable_setRequestLocale } from 'next-intl/server';
import AppButton from '@/components/app-button';
import { Locale } from '@/utils/constants';
import { SearchParams } from '@/utils/types';

const EmailVerificationSuccessPage = ({
  searchParams,
  params: { locale },
}: {
  searchParams: SearchParams;
  params: { locale: Locale };
}) => {
  unstable_setRequestLocale(locale);

  const hasRedirectPathParam = typeof searchParams.redirectPath === 'string';

  return (
    <div className="bg-custom-radial flex min-h-[inherit] flex-col items-center justify-center gap-10 px-10 text-center md:gap-16">
      <div className="flex w-full max-w-[400px] flex-col items-center justify-center gap-5">
        <Image alt="Obrazek sukcesu" className="h-[90px] w-[90px]" height={90} src="/success.svg" width={90} />
        <h1 className="text-2xl font-bold text-white md:text-3xl">
          Sukces! Twój adres email <br /> został zweryfikowany!
        </h1>
        <p className="text-white">Przejdź do swoich zgłoszeń i zacznij korzystać z FastyForm już dziś!</p>
      </div>
      <AppButton component={Link} href={hasRedirectPathParam ? (searchParams.redirectPath as string) : '/submissions'}>
        {hasRedirectPathParam ? 'Wróc na profil trenera' : 'Przejdź do swoich zgłoszeń'}
      </AppButton>
    </div>
  );
};

export default EmailVerificationSuccessPage;
