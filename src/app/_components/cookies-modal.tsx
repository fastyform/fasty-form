'use client';

import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import Link from 'next/link';
import { actionSetCookiesConsent } from '@/app/(legal-contact)/cookies/_actions/action-set-cookies-consent';
import AppButton from '@/components/app-button';
import AppDialog from '@/components/app-dialog';

const CookiesModal = ({ cookiesConsent }: { cookiesConsent?: RequestCookie }) => (
  <AppDialog
    open={!cookiesConsent}
    classes={{
      paper: 'pb-0 max-w-none m-0 min-h-screen-responsive rounded-none md:max-w-xl md:rounded-xl md:min-h-0',
    }}
  >
    <div className="flex flex-col gap-5 text-white">
      <h1 className="text-xl">
        Zanim zaczniesz z <span className="font-bold text-yellow-400">FastyForm</span>
      </h1>
      <div className="flex flex-col gap-2.5">
        <p className="text-sm">
          W celu zapewnienia najlepszego doświadczenia użytkownika, używamy różnych rodzajów plików{' '}
          <Link className="font-bold text-yellow-400 underline" href="/cookies?should-navigate-back=true">
            cookies
          </Link>
          , aby:
        </p>
        <ul className="list-disc pl-5 text-sm text-white/60">
          <li>Nasza aplikacja była w pełni funkcjonalna</li>
        </ul>
      </div>
      <div className="flex flex-col gap-2.5">
        <p className="text-sm">Po klknięciu &quot;akceptuj wszystkie&quot; będziemy jeszcze używać ciasteczek, aby</p>
        <ul className="list-disc pl-5 text-sm text-white/60">
          <li>Analizować ruch na stronie i poprawiać nasze usługi</li>
          <li>Rozumieć zachowania użytkowników, aby zwiększyć ogólną użyteczność strony</li>
        </ul>
      </div>
      <p className="text-sm">Po klknięciu &quot;odrzuć wszystkie&quot; nie będziemy zbierać dodatkowych ciasteczek</p>
      <p className="text-sm">
        Masz pełną kontrolę nad opcjonalnymi plikami cookie, które używamy. Zapoznaj się z naszą{' '}
        <Link className="font-bold text-yellow-400 underline" href="/cookies?should-navigate-back=true">
          Polityką Plików Cookies
        </Link>{' '}
        aby dowiedzieć się więcej o różnych rodzajach plików cookie i ich zastosowaniu. W każdej chwili możesz przejrzeć
        i zmienić swoje wybory dotyczące plików cookie, dostosowując ustawienia zgodnie z własnymi preferencjami.
      </p>
      <div className="sticky bottom-0 flex flex-wrap justify-center gap-5 bg-[#1e2226] p-5">
        <AppButton
          classes={{
            root: 'bg-[#1E2226] text-white font-normal py-2.5 text-base rounded-full border border-gray-600 border-solid text-sm',
          }}
          onClick={() => actionSetCookiesConsent({ googleAnalytics: false, hotjar: false })}
        >
          Odrzuć wszystkie
        </AppButton>
        <AppButton
          classes={{ root: 'py-2.5 text-sm' }}
          onClick={() => actionSetCookiesConsent({ googleAnalytics: true, hotjar: true })}
        >
          Akceptuj wszystkie
        </AppButton>
      </div>
    </div>
  </AppDialog>
);

export default CookiesModal;
