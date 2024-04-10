import Constants, { COMPANY_INFO } from '@/utils/constants';

const privacyPolicyData = {
  Wprowadzenie: [
    `Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych użytkowników Aplikacji ${Constants.APP_NAME}.`,
    `Administratorem danych jest ${COMPANY_INFO}, zwany dalej Administratorem.`,
  ],
  'Zakres przetwarzanych danych': [
    'Aplikacja przetwarza dane osobowe podane dobrowolnie przez użytkowników w procesie rejestracji, w tym dane logowania, typ konta (klient, trener)',
    'Dane zbierane podczas rejestracji to m.in. dane logowania, typ konta (klient, trener).',
    'W przypadku konta trenera, dodatkowo po zarejestrowaniu użytkownik przechodzi proces onboarding, podczas którego aplikacja zbiera takie informacje jak nazwa profilu trenera, cena oferowanych usług oraz link do zdjęcia profilowego.',
    'Dane są przechowywane na serwerach dostawców usług: Vercel (frontend), Supabase (backend) oraz Stripe (płatności),  którzy zapewniają odpowiednie zabezpieczenia danych.',
    'Wszystkie dane przekazywane podmiotom trzecim, takim jak Stripe, Vercel, i Supabase, są chronione zgodnie z ich politykami prywatności. Zachęcamy użytkowników do zapoznania się z politykami prywatności tych usług, aby zrozumieć, jak przetwarzane są ich dane.',
    'Dla kont trenerów działających jako przedsiębiorstwa, aplikacja wymaga podania NIP oraz adresu firmy, które są zbierane dodatkowo poza procesem onboardingowym Stripe. Celem zebrania tych informacji jest ich wykorzystanie na paragonach Stripe, aby zapewnić zgodność z wymaganiami prawnymi oraz preferencjami użytkownika dotyczącymi dokumentów płatniczych. Imię i nazwisko trenerów będących osobami fizycznymi są zbierane w ramach standardowego procesu tworzenia konta i mogą być również używane na paragonach Stripe.',
  ],
  'Cel przetwarzania danych': [
    'Dane osobowe są przetwarzane w celu świadczenia usług przez Aplikację, w tym analizy wideo, obsługi płatności, a także do celów administracyjnych i prawnych.',
    'Dane osobowe są przetwarzane na podstawie zgody użytkownika, w celu wykonania umowy między użytkownikiem a Administratorem, lub gdy przetwarzanie jest niezbędne do wypełnienia obowiązku prawnego ciążącego na Administratorze.',
    'Dane osobowe mogą być również przetwarzane w celu przesyłania użytkownikowi informacji marketingowych, pod warunkiem wyrażenia przez niego zgody. Obejmuje to informacje o promocjach, poradach i nowościach związanych z Aplikacją, wysyłane drogą mailową.',
  ],
  'Bezpieczeństwo danych': [
    'Administrator zobowiązuje się do ochrony danych osobowych zgodnie z obowiązującymi przepisami i najlepszymi praktykami. Stosowane są odpowiednie środki techniczne i organizacyjne.',
  ],
  'Niezbędna Komunikacja E-mailowa': [
    `Użytkownik wyraża zgodę na otrzymywanie komunikacji e-mailowej niezbędnej do świadczenia usług przez aplikację ${Constants.APP_NAME}. Ta komunikacja może obejmować powiadomienia dotyczące konta, przebiegu procesu rejestracji, przebiegu procesu podłączania płatności, transakcji, aktualizacji usług oraz innych ważnych informacji.`,
  ],
  'Komunikacja Marketingowa': [
    'Użytkownik może wyrazić zgodę na otrzymywanie komunikacji marketingowej, w tym informacji o promocjach, poradach i nowościach związanych z Aplikacją, poprzez zaznaczenie odpowiedniego checkboxa podczas rejestracji lub w ustawieniach aplikacji.',
    'Użytkownik ma prawo w każdej chwili cofnąć zgodę na przetwarzanie swoich danych osobowych w celach marketingowych. Może to zrobić, zmieniając ustawienia w zakładce powiadomień w aplikacji lub korzystając z linku do rezygnacji dostępnego w każdym e-mailu marketingowym.',
    'Cofnięcie zgody na otrzymywanie komunikacji marketingowej nie wpływa na zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej cofnięciem.',
  ],
  'Prawa użytkownika': [
    'Użytkownik ma prawo dostępu do swoich danych, ich sprostowania, usunięcia (prawo do bycia zapomnianym) lub ograniczenia przetwarzania. Użytkownik może zażądać usunięcia swojego konta w aplikacji, co skutkuje trwałym usunięciem wszystkich jego danych osobowych. W celu usunięcia wszystkich nagrań wideo powiązanych z kontem, użytkownik jest zobowiązany do bezpośredniego kontaktu z obsługą aplikacji.',
    'Użytkownik ma prawo wniesienia sprzeciwu co do przetwarzania jego danych osobowych.',
    'Użytkownik ma prawo do przenoszenia danych, czyli otrzymania od Administratora swoich danych osobowych w ustrukturyzowanym, powszechnie używanym formacie nadającym się do odczytu maszynowego. Użytkownik może przesłać te dane innemu administratorowi.',
    'Użytkownik ma prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (UODO), jeśli uważa, że przetwarzanie danych osobowych narusza przepisy ogólnego rozporządzenia o ochronie danych osobowych z dnia 27 kwietnia 2016 r.',
  ],
  'Udostępnianie danych': [
    'Dane mogą być udostępniane podmiotom zewnętrznym wyłącznie w celach niezbędnych do realizacji usług Aplikacji. Wszelkie udostępnianie danych odbywa się z zachowaniem najwyższych standardów ochrony danych.',
    'Dane osobowe użytkowników są przechowywane przez okres niezbędny do realizacji celów, dla których zostały zebrane, w tym dla potrzeb wykonania umowy oraz zgodnie z obowiązującymi przepisami prawa. Po tym okresie dane są usuwane lub anonimizowane.',
    'Gdy użytkownik (konto Trenera lub konto Klienta) podaje dane osobowe w związku z Usługami płatniczymi Stripe, Stripe otrzymuje te dane osobowe i przetwarza je zgodnie z <a class="text-yellow-400" href="https://stripe.com/en-pl/privacy">Polityką prywatności Stripe</a>.',
    'Dane osobowe trenerów, takie jak imię i nazwisko osób fizycznych oraz NIP i adres firm, mogą być udostępniane dostawcy płatności Stripe w celu generowania paragonów. Stripe przetwarza te dane zgodnie ze swoją polityką prywatności, co zapewnia użytkownikom przejrzystość i bezpieczeństwo w zakresie przetwarzania ich danych osobowych.',
    'W celu realizacji komunikacji marketingowej, dane osobowe użytkowników mogą być udostępniane dostawcy usług zewnętrznych, takim jak SendGrid, który wspiera Właściciela Aplikacji w wysyłaniu e-maili. SendGrid przetwarza dane osobowe użytkowników zgodnie ze swoją polityką prywatności i w imieniu Administratora danych. Zachęcamy użytkowników do zapoznania się z polityką prywatności SendGrid, aby zrozumieć, jak są przetwarzane ich dane w ramach usług marketingowych.',
  ],
  'Zmiany w Polityce Prywatności': [
    'Administrator zastrzega sobie prawo do wprowadzania zmian w Polityce Prywatności. O wszelkich zmianach użytkownicy zostaną poinformowani poprzez e-mail lub powiadomienia w aplikacji.',
  ],
  'Postępowanie w przypadku naruszenia bezpieczeństwa danych': [
    'W przypadku naruszenia bezpieczeństwa danych, użytkownicy zostaną niezwłocznie poinformowani drogą mailową. Naruszenie będzie również zgłoszone do odpowiednich organów zgodnie z obowiązującymi przepisami.',
  ],
  'Ciasteczka (Cookies)': [
    `Aplikacja ${Constants.APP_NAME} używa ciasteczek (cookies) w celu poprawy doświadczeń użytkowników, analizy ruchu na stronie, personalizacji treści i reklam oraz zapewnienia funkcji mediów społecznościowych. Ciasteczka są małymi plikami tekstowymi, które są przechowywane na urządzeniu użytkownika przez strony internetowe, które odwiedzają.`,
    `Używamy ciasteczek zarówno sesyjnych, jak i stałych. Ciasteczka sesyjne są tymczasowe i wygasają po zamknięciu przeglądarki. Ciasteczka stałe pozostają na urządzeniu użytkownika przez określony czas lub do momentu ich manualnego usunięcia.`,
    `Użytkownicy mogą w każdej chwili dostosować ustawienia ciasteczek w swojej przeglądarce, jednak blokowanie niektórych typów ciasteczek może wpłynąć na korzystanie z pełnej funkcjonalności aplikacji.`,
    `Szczegółowe informacje na temat ciasteczek używanych przez Aplikację ${Constants.APP_NAME}, ich celu, oraz instrukcje dotyczące zarządzania ciasteczkami, znajdują się na dedykowanej stronie z  <a class="text-yellow-400" href="${Constants.ORIGIN_URL}/cookies">ciasteczkami</a>.`,
  ],
  Kontakt: [
    'W przypadku pytań dotyczących przetwarzania danych osobowych, użytkownicy mogą kontaktować się z Administratorem poprzez formularz kontaktowy.',
  ],
};

export default privacyPolicyData;
