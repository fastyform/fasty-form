'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import AppButton from '@/components/app-button';
import AppDialog from '@/components/app-dialog';

const dialogData = {
  true: [
    'success',
    'Gratulacje!',
    'Udało Ci się połączyć z kontem stripe. Od teraz twoje konto trenera jest aktywne. Twoja strona profilowa, jest widoczna dla wszystkich, oraz możesz przyjmować płatności.',
  ],
  false: [
    'fail',
    'Przykro nam!',
    'Coś poszło nie tak. Twoje konto nadal jest nie aktywne. Spróbuj ponownie, lub skontaktuj się z nami.',
  ],
};

type SuccessParamType = keyof typeof dialogData;

const OnboardingStripeStatusDialog = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const successParam = searchParams.get('isSuccess');

  if (!Object.keys(dialogData).includes(successParam || '') || !successParam) return;

  const [icon, title, description] = dialogData[successParam as SuccessParamType];

  const handleModalClose = () => {
    router.replace('/settings/payments');
  };

  return (
    <AppDialog open={!!successParam} onClose={handleModalClose}>
      <div className="flex flex-col items-center gap-5">
        <Image alt="Ikonka stanu" className="h-[90px] w-[90px]" height={90} src={`/${icon}.svg`} width={90} />
        <div className="flex flex-col gap-2.5">
          <h4 className="text-center text-base font-bold text-white">{title}</h4>
          <p className="text-center text-sm text-white">{description}</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <AppButton classes={{ root: 'py-2.5 bg-inherit' }} className="text-sm text-white" onClick={handleModalClose}>
            Zamknij
          </AppButton>
        </div>
      </div>
    </AppDialog>
  );
};

export default OnboardingStripeStatusDialog;
