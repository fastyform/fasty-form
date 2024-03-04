import { Link } from '@react-email/components';
import Constants from '@/utils/constants';
import MailTemplate from './mail-template';

const RequirementsSent = ({ trainerName, submissionId }: { trainerName: string; submissionId: string }) => (
  <MailTemplate title="Pojawiło się nowe zgłoszenie">
    <MailTemplate.CallToAction href={`${Constants.ORIGIN_URL}/submissions/${submissionId}`}>
      Sprawdź zgłoszenie
    </MailTemplate.CallToAction>
    <MailTemplate.LineBreak />
    Cześć {trainerName}!
    <MailTemplate.LineBreak /> Mamy świetne wieści -{' '}
    <strong>
      pojawiło się nowe zgłoszenie od klienta w <MailTemplate.AppLink />.{' '}
    </strong>
    Klient właśnie uzupełnił szczegóły swojego zgłoszenia i jego wideo jest gotowe do analizy.
    <MailTemplate.LineBreak />{' '}
    <strong>
      Oto co musisz zrobić, <Link href={`${Constants.ORIGIN_URL}/submissions/${submissionId}`}>kliknij tutaj</Link>,
      albo:
    </strong>
    <br /> 1. Zaloguj się do swojego konta na <MailTemplate.AppLink />.
    <br /> 2. Przejdź do zakładki &apos;Zgłoszenia&apos;.
    <br /> 3. Wybierz nowe zgłoszenie.
    <br /> 4. Wyślij informację zwrotną na temat przesłanego wideo.
    <MailTemplate.LineBreak /> Jesteśmy przekonani, że Twoja wiedza i doświadczenie będą kluczowe w szlifowaniu techniki
    Twoich klientów.
    <MailTemplate.LineBreak /> Jeśli masz jakiekolwiek pytania lub potrzebujesz wsparcia, skontaktuj się z nami przez{' '}
    <Link href={`${Constants.ORIGIN_URL}/contact`}>formularz kontaktowy</Link>.{' '}
    <strong>Jesteśmy tutaj, aby Ci pomóc.</strong>
    <MailTemplate.LineBreak />
    Dziękujemy za Twoje zaangażowanie i ciężką pracę w {Constants.APP_NAME}.
    <MailTemplate.LineBreak /> Pozdrawiamy,
    <br /> Zespół {Constants.APP_NAME}
  </MailTemplate>
);

export default RequirementsSent;
