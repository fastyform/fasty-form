import Image from 'next/image';
import Link from 'next/link';
import AppButton from '@/components/app-button';

const EmailVerificationSuccessPage = () => (
  <div className="flex min-h-[inherit] flex-col items-center justify-center gap-10 px-10 text-center md:gap-16">
    <div className="flex flex-col items-center justify-center gap-5">
      <Image alt="" className="h-[90px] w-[90px]" height={90} src="/success.svg" width={90} />
      <h1 className="text-2xl font-bold text-white md:text-3xl">
        Sukces! Twój adres email <br /> został zweryfikowany!
      </h1>
    </div>
    <AppButton component={Link} href="/submissions">
      Przejdź do swoich zgłoszeń
    </AppButton>
  </div>
);

export default EmailVerificationSuccessPage;
