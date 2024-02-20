import Constants from '@/utils/constants';

const NewLine = () => (
  <>
    <br />
    <br />
  </>
);

const StripeOnboardingMailTemplateContent = () => (
  <>
    Cześć!
    <NewLine />
    Gratulacje z powodu zakończenia procesu rejestracji Twojego profilu trenera na {Constants.APP_NAME}! Jesteś o krok
    od pełnej aktywacji swojego konta i rozpoczęcia przyjmowania płatności od swoich klientów za weryfikację techniki.
    <NewLine />
    <strong>Aby aktywować odbieranie płatności, wystarczą 3 proste kroki:</strong>
    <NewLine />
    1. Przejdź na stronę ustawień płatności na {Constants.APP_NAME}.
    <br />
    2. Podłącz swoje konto bankowe
    <br />
    3. Zatwierdź ustawienia i zacznij odbierać zarobki bezpośrednio na swoje konto.
    <NewLine />
    <strong>
      Gotowe! Teraz, gdy ustawienia płatności są aktywne, możesz udostępniać swój profil i zarabiać na weryfikacji
      techniki.
    </strong>
    <NewLine />
    To ostatni etap, dzięki któremu otwierają się przed Tobą możliwości {Constants.APP_NAME}. Czekamy, aby zobaczyć, jak
    będziesz promować swoje usługi i cieszyć się zasłużonym wynagrodzeniem.
    <NewLine />
    W razie pytań lub potrzeby wsparcia - jesteśmy do Twojej dyspozycji. Dziękujemy, że dołączyłeś(aś) do naszej
    społeczności trenerów.
    <NewLine />
    Pozdrawiamy,
    <br />
    <strong>Zespół {Constants.APP_NAME}</strong>
  </>
);

export default StripeOnboardingMailTemplateContent;
