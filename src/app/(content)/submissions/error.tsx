'use client';

import MobileNavbarLink from '@/app/(content)/_components/navbar/mobile-navbar/mobile-navbar-link';

const SubmissionError = () => (
  <div className="flex flex-col gap-5">
    <MobileNavbarLink aria-label="Zgłoszenia" href="/submissions" icon="back" />
    <h2 className="text-base text-white">
      Nie udało się pobrać Twoich zgłoszeń. Spróbuj odświeżyć stronę lub jeśli problem będzie się powtarzał, skontaktuj
      się z nami.
    </h2>
  </div>
);

export default SubmissionError;
