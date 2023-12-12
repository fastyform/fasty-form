import Link from 'next/link';

const LegalPage = () => {
  const shouldNavigateBackParam = '?should-navigate-back=true';

  return (
    <>
      <h1 className="text-2xl text-white">Dokumenty Prawne</h1>
      <Link className="text-sm text-white" href={`/terms-of-service${shouldNavigateBackParam}`}>
        Regulamin
      </Link>
      <Link className="text-sm text-white" href={`/privacy-policy${shouldNavigateBackParam}`}>
        Polityka prywatności
      </Link>
    </>
  );
};

export default LegalPage;
