import { Link } from '@react-email/components';
import Constants from '@/utils/constants';
import MailTemplate from './mail-template';

const RequirementsSent = ({ trainerName, submissionId }: { trainerName: string; submissionId: string }) => (
  <MailTemplate title="Pojawiło się nowe zgłoszenie">
    <MailTemplate.CallToAction href={`${Constants.ORIGIN_URL}/submissions/${submissionId}`}>
      Sprawdź zgłoszenie
    </MailTemplate.CallToAction>
    <MailTemplate.Break />
    Cześć {trainerName}!
    <MailTemplate.Break /> Mamy świetne wieści - pojawiło się nowe zgłoszenie od klienta w <MailTemplate.AppLink />.
    Klient właśnie uzupełnił szczegóły swojego zgłoszenia i jego wideo jest gotowe do analizy.
    <MailTemplate.Break /> Oto co musisz zrobić,{' '}
    <Link href={`${Constants.ORIGIN_URL}/submissions/${submissionId}`}>kliknij tutaj</Link>, albo:
    <br /> 1. Zaloguj się do swojego konta na <MailTemplate.AppLink />.
    <br /> 2. Przejdź do zakładki &apos;Zgłoszenia&apos;.
    <br /> 3. Wybierz nowe zgłoszenie.
    <br /> 4. Wyślij informację zwrotną na temat przesłanego wideo.
    <MailTemplate.Break /> Jesteśmy przekonani, że Twoja wiedza i doświadczenie będą kluczowe w szlifowaniu techniki
    Twoich klientów.
    <MailTemplate.Break /> Jeśli masz jakiekolwiek pytania lub potrzebujesz wsparcia, skontaktuj się z nami przez{' '}
    <Link href={`${Constants.ORIGIN_URL}/contact`}>formularz kontaktowy</Link>. Jesteśmy tutaj, aby Ci pomóc.
    <MailTemplate.Break />
    Dziękujemy za Twoje zaangażowanie i ciężką pracę w {Constants.APP_NAME}.
    <MailTemplate.Break /> Pozdrawiamy,
    <br /> Zespół {Constants.APP_NAME}
  </MailTemplate>
);

export default RequirementsSent;
