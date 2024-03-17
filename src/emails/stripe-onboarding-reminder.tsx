import Constants from '@/utils/constants';
import MailTemplate from './mail-template';

const StripeOnboardingReminder = ({ title }: { title: string }) => (
  <MailTemplate title={title}>
    <MailTemplate.CallToAction href={`${Constants.ORIGIN_URL}/payments`}>Aktywuj płatności</MailTemplate.CallToAction>
    <MailTemplate.LineBreak />
    Cześć!
    <MailTemplate.LineBreak />
    Gratulacje z powodu zakończenia procesu rejestracji Twojego profilu trenera na <MailTemplate.AppLink />! Jesteś o
    krok od pełnej aktywacji swojego konta i rozpoczęcia przyjmowania płatności od swoich klientów za weryfikację
    techniki.
    <MailTemplate.LineBreak />
    <strong>Aby aktywować odbieranie płatności, wystarczą 3 proste kroki:</strong>
    <MailTemplate.LineBreak />
    1. Przejdź na stronę ustawień płatności na {Constants.APP_NAME}.
    <br />
    2. Podłącz swoje konto bankowe
    <br />
    3. Zatwierdź ustawienia i zacznij odbierać zarobki bezpośrednio na swoje konto.
    <MailTemplate.LineBreak />
    <strong>
      Gotowe! Teraz, gdy ustawienia płatności są aktywne, możesz udostępniać swój profil i zarabiać na weryfikacji
      techniki.
    </strong>
    <MailTemplate.LineBreak />
    To ostatni etap, dzięki któremu otwierają się przed Tobą możliwości {Constants.APP_NAME}. Czekamy, aby zobaczyć, jak
    będziesz promować swoje usługi i cieszyć się zasłużonym wynagrodzeniem.
    <MailTemplate.LineBreak />
    W razie pytań lub potrzeby wsparcia - jesteśmy do Twojej dyspozycji. Dziękujemy, że dołączyłeś(aś) do naszej
    społeczności trenerów.
    <MailTemplate.LineBreak />
    Pozdrawiamy,
    <br />
    Zespół {Constants.APP_NAME}
  </MailTemplate>
);

export default StripeOnboardingReminder;
