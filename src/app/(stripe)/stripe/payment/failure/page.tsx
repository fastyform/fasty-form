import Image from 'next/image';
import { redirect } from 'next/navigation';
import AppButtonLink from '@/components/app-button-link';
import { SearchParams } from '@/utils/types';

const FailurePaymentPage = ({ searchParams }: { searchParams: SearchParams }) => {
  const trainerId = searchParams.trainer_id;
  if (!trainerId) redirect('/submissions');

  return (
    <div className="bg-custom-radial flex min-h-screen items-center justify-center p-5 text-white">
      <div className="flex flex-col items-center gap-5">
        <Image alt="Ikonka sukcesu" className="h-[90px] w-[90px]" height={90} src="/fail.svg" width={90} />
        <div className="flex flex-col gap-2.5">
          <h2 className="text-center text-base font-bold md:text-xl lg:text-2xl xl:text-3xl">
            Nie udało się dokonać płatności
          </h2>
          <p className="text-center text-sm lg:text-base">Spróbuj ponownie lub skontaktuj się z nami.</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <AppButtonLink className="py-2.5 text-sm" href={`/trainers/${trainerId}`}>
            Wróć na stronę trenera
          </AppButtonLink>
        </div>
      </div>
    </div>
  );
};

export default FailurePaymentPage;
