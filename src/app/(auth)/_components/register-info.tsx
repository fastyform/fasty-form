import Link from 'next/link';

const RegisterInfo = () => (
  <div className="text-center text-xs text-zinc-200">
    Tworząc konto, zgadzasz się z naszym{' '}
    <Link className="underline" href="/terms-of-service">
      Regulaminem
    </Link>
    ,{' '}
    <Link className="underline" href="/privacy-policy">
      Polityką prywatności
    </Link>{' '}
    i{' '}
    <Link className="text-zinc-200 underline" href="/notifications">
      Domyślnymi ustawieniami powiadomień.
    </Link>
  </div>
);

export default RegisterInfo;
