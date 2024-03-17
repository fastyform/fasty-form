import AppButton from '@/components/app-button';

const PaymentsPendingVerification = () => (
  <div className="my-5 flex w-full flex-col gap-8 self-center sm:max-w-lg md:mx-auto">
    <div className="flex flex-col gap-2.5 text-white">
      <h1 className="text-2xl">Zarobki</h1>
      <p className="max-w-lg">Twoje konto jest w trakcie weryfikacji.</p>
    </div>
    <AppButton disabled classes={{ root: 'py-2.5 w-fit' }}>
      Trwa weryfikacja
    </AppButton>
  </div>
);

export default PaymentsPendingVerification;
