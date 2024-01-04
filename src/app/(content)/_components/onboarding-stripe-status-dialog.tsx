'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import AppButton from '@/components/app-button';
import AppDialog from '@/components/app-dialog';

const dialogData = {
  verified: [
    'success',
    'Gratulacje!',
    'Sukces! Twoje połączenie z kontem Stripe zostało zrealizowane. Od teraz jesteś aktywnym trenerem na naszej platformie. Twoja strona profilowa jest już dostępna dla użytkowników, a Ty możesz rozpocząć przyjmowanie płatności.',
  ],
  error: [
    'fail',
    'Przykro nam!',
    'Ups, coś poszło nie tak. Twoje konto trenera wciąż pozostaje nieaktywne. Spróbuj jeszcze raz, a jeśli problem będzie się powtarzał, skontaktuj się z nami.',
  ],
  pending_verification: [
    'success',
    'Gratulacje!',
    'Twoje konto jest w trakcie weryfikacji. Jeszcze chwila, a będziesz mógł rozpocząć przyjmowanie płatności. W międzyczasie możesz już korzystać z pozostałych funkcji portalu.',
  ],
};

type SuccessParamType = keyof typeof dialogData;

const OnboardingStripeStatusDialog = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const successParam = searchParams.get('stripe_onboarding_status');

  if (!Object.keys(dialogData).includes(successParam || '') || !successParam) return;

  const [icon, title, description] = dialogData[successParam as SuccessParamType];

  const handleModalClose = () => {
    router.replace('/settings/payments');
  };

  return (
    <AppDialog open={!!successParam} onClose={handleModalClose}>
      <div className="flex flex-col items-center gap-5 text-white">
        <Image alt="Ikonka stanu" className="h-[90px] w-[90px]" height={90} src={`/${icon}.svg`} width={90} />
        <div className="flex flex-col gap-2.5">
          <h2 className="text-center text-base font-bold">{title}</h2>
          <p className="text-center text-sm">{description}</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <AppButton classes={{ root: 'py-2.5 bg-inherit text-white' }} className="text-sm" onClick={handleModalClose}>
            Zamknij
          </AppButton>
        </div>
      </div>
    </AppDialog>
  );
};

export default OnboardingStripeStatusDialog;
