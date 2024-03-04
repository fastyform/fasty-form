import Constants from '@/utils/constants';
import MailTemplate from './mail-template';

const OnboardingReminder = ({ title }: { title: string }) => (
  <MailTemplate title={title}>
    <MailTemplate.CallToAction href={`${Constants.ORIGIN_URL}/submissions`}>
      Dokończ rejestrację
    </MailTemplate.CallToAction>
    <MailTemplate.LineBreak />
    Cześć!
    <MailTemplate.LineBreak />
    Zauważyliśmy, że rozpocząłeś(aś) proces tworzenia konta na platformie <MailTemplate.AppLink /> ale nie został on
    jeszcze zakończony. Chcielibyśmy upewnić się, że nie napotykasz żadnych przeszkód i że cały proces przebiega
    bezproblemowo.
    <MailTemplate.LineBreak />
    <strong>
      Aby aktywować swoje konto i zacząć korzystać z wszystkich funkcji <MailTemplate.AppLink />, wystarczy, że wykonasz
      kilka prostych kroków:
    </strong>
    <MailTemplate.LineBreak />
    1. Przejdź na stronę {Constants.APP_NAME}.
    <br />
    2. Zaloguj się na swoje konto.
    <br />
    3. Dokończ proces rejestracji.
    <MailTemplate.LineBreak />
    <strong>Kompletując rejestrację, zyskasz:</strong>
    <MailTemplate.LineBreak />
    1. <strong>Widoczność Twojego profilu trenera</strong> dla klientów i obserwatorów.
    <br />
    2. Możliwość <strong>otrzymywania płatności za weryfikację techniki</strong> od swoich klientów.
    <br />
    3. Opcję <strong>skopiowania i udostępnienia linku do Twojego profilu trenera</strong> na platformach
    społecznościowych.
    <MailTemplate.LineBreak />
    Jeśli masz jakiekolwiek pytania lub potrzebujesz pomocy w dokończeniu procesu, jesteśmy tutaj, aby Ci pomóc.
    Skontaktuj się z nami odpowiadając na ten adres e-mail.
    <MailTemplate.LineBreak />
    Dziękujemy za Twoje zainteresowanie naszą aplikacją!.
    <MailTemplate.LineBreak />
    Pozdrawiamy,
    <br />
    Zespół {Constants.APP_NAME}
  </MailTemplate>
);

export default OnboardingReminder;
