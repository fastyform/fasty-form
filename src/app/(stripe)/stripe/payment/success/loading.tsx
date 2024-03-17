import Image from 'next/image';
import Link from 'next/link';
import AppButton from '@/components/app-button';

const LoadingPageSuccess = () => (
  <div className="bg-custom-radial min-h-screen-responsive flex items-center justify-center p-5 text-white">
    <div className="flex flex-col items-center gap-5">
      <Image alt="Ikonka sukcesu" className="h-[90px] w-[90px]" height={90} src="/success.svg" width={90} />
      <div className="flex flex-col gap-2.5">
        <h2 className="text-center text-base font-bold">Płatność zakończona pomyślnie</h2>
        <p className="text-center text-sm">
          Nastąpi przekierowanie. Jeżeli to się nie wydarzy kliknij w przycisk poniżej.
        </p>
      </div>
      <div className="flex flex-wrap gap-5">
        <AppButton classes={{ root: 'py-2.5 text-sm' }} component={Link} href="/submissions">
          Twoje zgłoszenia
        </AppButton>
      </div>
    </div>
  </div>
);

export default LoadingPageSuccess;
