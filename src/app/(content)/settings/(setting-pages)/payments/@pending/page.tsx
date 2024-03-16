import AppButton from '@/components/app-button';

const PaymentsPending = () => (
  <div className="flex flex-col gap-8">
    <div className="flex flex-col gap-2.5 text-white">
      <h1 className="text-2xl">Zarobki</h1>
      <p className="max-w-lg">Twoje konto jest w trakcie weryfikacji.</p>
    </div>
    <AppButton disabled classes={{ root: 'py-2.5 w-fit' }}>
      Trwa weryfikacja
    </AppButton>
  </div>
);

export default PaymentsPending;
