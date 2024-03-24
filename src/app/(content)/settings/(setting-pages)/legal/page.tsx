import Link from 'next/link';

const LegalPage = () => (
  <>
    <h1 className="text-2xl text-white">Dokumenty Prawne</h1>
    <Link className="text-sm text-white" href="/terms-of-service">
      Regulamin
    </Link>
    <Link className="text-sm text-white" href="/privacy-policy">
      Polityka prywatności
    </Link>
    <Link className="text-sm text-white" href="/cookies">
      Ciasteczka
    </Link>
  </>
);

export default LegalPage;
