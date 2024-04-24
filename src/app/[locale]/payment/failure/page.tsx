import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import AppButton from '@/components/app-button';
import { Locale } from '@/utils/constants';
import { SearchParams } from '@/utils/types';

const FailurePaymentPage = ({
  searchParams,
  params: { locale },
}: {
  searchParams: SearchParams;
  params: { locale: Locale };
}) => {
  unstable_setRequestLocale(locale);

  const trainerProfileSlug = searchParams.trainer_profile_slug;
  if (!trainerProfileSlug) redirect('/submissions');

  return (
    <div className="bg-custom-radial min-h-screen-responsive flex items-center justify-center p-5 text-white">
      <div className="flex flex-col items-center gap-5">
        <Image alt="Ikonka sukcesu" className="h-[90px] w-[90px]" height={90} src="/fail.svg" width={90} />
        <div className="flex flex-col gap-2.5">
          <h2 className="text-center text-base font-bold md:text-xl lg:text-2xl xl:text-3xl">
            Nie udało się dokonać płatności
          </h2>
          <p className="text-center text-sm lg:text-base">Spróbuj ponownie lub skontaktuj się z nami.</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <AppButton classes={{ root: 'py-2.5 text-sm' }} component={Link} href={`/trainers/${trainerProfileSlug}`}>
            Wróć na stronę trenera
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default FailurePaymentPage;
