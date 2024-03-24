import Link from 'next/link';
import AppButton from '@/components/app-button';

const SupportPage = () => (
  <>
    <h1 className="text-2xl text-white">Wsparcie</h1>
    <AppButton
      classes={{ root: 'py-2.5 self-start text-sm sm:text-base' }}
      href="/contact?should-navigate-back=true"
      LinkComponent={Link}
    >
      Przejdź do formularza kontaktowego
    </AppButton>
  </>
);

export default SupportPage;
