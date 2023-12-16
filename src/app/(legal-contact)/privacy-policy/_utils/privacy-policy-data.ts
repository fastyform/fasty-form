import Constants from '@/utils/constants';

const privacyPolicyData = {
  Wprowadzenie: [
    `Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych użytkowników Aplikacji ${Constants.APP_NAME}.`,
    'Administratorem danych jest Przemysław Paziewski i Kacper Zabielski, zwani dalej Administratorem.',
  ],
  'Zakres przetwarzanych danych': [
    'Aplikacja przetwarza dane osobowe podane dobrowolnie przez użytkowników w procesie rejestracji.',
    'Dane zbierane podczas rejestracji to m.in. dane logowania, typ konta (klient, trener).',
    'W przypadku konta trenera, dodatkowo po zarejestrowaniu użytkownik przechodzi proces onboarding, podczas którego aplikacja zbiera takie informacje jak nazwa profilu trenera, cena oferowanych usług oraz link do zdjęcia profilowego.',
    'Dane są przechowywane przez okres niezbędny do świadczenia usług Aplikacji oraz zgodnie z wymaganiami prawnymi. Stosujemy zaawansowane metody szyfrowania i bezpieczne serwery do ochrony danych.',
  ],
  'Cel przetwarzania danych': [
    'Dane osobowe są przetwarzane w celu świadczenia usług przez Aplikację, w tym analizy wideo, obsługi płatności.',
  ],
  'Bezpieczeństwo danych': [
    'Administrator zobowiązuje się do ochrony danych osobowych zgodnie z obowiązującymi przepisami i najlepszymi praktykami. Stosowane są odpowiednie środki techniczne i organizacyjne.',
  ],
  'Prawa użytkownika': [
    'Użytkownik ma prawo dostępu do swoich danych, ich sprostowania, usunięcia lub ograniczenia przetwarzania.',
    'Użytkownik ma prawo wniesienia sprzeciwu co do przetwarzania jego danych osobowych.',
    'Aby skorzystać z tych praw, użytkownik może skontaktować się z nami za pośrednictwem formularza kontaktowego dostępnego na naszej stronie.',
  ],
  'Udostępnianie danych': [
    'Dane mogą być udostępniane podmiotom zewnętrznym wyłącznie w celach niezbędnych do realizacji usług Aplikacji, np. operatorom płatności, z zachowaniem ścisłych zasad ochrony danych.',
    'Współpracujemy z zaufanymi dostawcami usług hostingowych i płatności, takimi jak Vercel (frontend), Supabase (backend) oraz Stripe (płatności) którzy przestrzegają rygorystycznych zasad ochrony danych.',
  ],
  'Zmiany w Polityce Prywatności': [
    'Administrator zastrzega sobie prawo do wprowadzania zmian w Polityce Prywatności. O wszelkich zmianach użytkownicy zostaną poinformowani w odpowiedni sposób.',
    'Informacje o zmianach będą przekazywane użytkownikom poprzez e-mail lub poprzez powiadomienia w aplikacji.',
  ],
  Kontakt: [
    'W przypadku pytań dotyczących przetwarzania danych osobowych, użytkownicy mogą kontaktować się z Administratorem poprzez formularz kontaktowy.',
  ],
};

export default privacyPolicyData;
