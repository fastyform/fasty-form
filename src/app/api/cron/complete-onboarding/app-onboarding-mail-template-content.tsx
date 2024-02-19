import Constants from '@/utils/constants';

const NewLine = () => (
  <>
    <br />
    <br />
  </>
);

const AppOnboardingMailTemplateContent = () => (
  <>
    Cześć!
    <NewLine />
    Zauważyliśmy, że rozpocząłeś(aś) proces tworzenia konta na platformie {Constants.APP_NAME}, ale nie został on
    jeszcze zakończony. Chcielibyśmy upewnić się, że nie napotykasz żadnych przeszkód i że cały proces przebiega
    bezproblemowo.
    <NewLine />
    <strong>
      Aby aktywować swoje konto i zacząć korzystać z wszystkich funkcji {Constants.APP_NAME}, wystarczy, że wykonasz
      kilka prostych kroków:
    </strong>
    <NewLine />
    1. Przejdź na stronę {Constants.APP_NAME}.
    <br />
    2. Zaloguj się na swoje konto.
    <br />
    3. Dokończ proces rejestracji.
    <NewLine />
    <strong>Kompletując rejestrację, zyskasz:</strong>
    <NewLine />
    1. <strong>Widoczność Twojego profilu trenera</strong> dla klientów i obserwatorów.
    <br />
    2. Możliwość <strong>otrzymywania płatności za weryfikację techniki</strong> od swoich klientów.
    <br />
    3. Opcję <strong>skopiowania i udostępnienia linku do Twojego profilu trenera</strong> na platformach
    społecznościowych.
    <NewLine />
    Jeśli masz jakiekolwiek pytania lub potrzebujesz pomocy w dokończeniu procesu, jesteśmy tutaj, aby Ci pomóc.
    Skontaktuj się z nami odpowiadając na ten adres e-mail.
    <NewLine />
    Dziękujemy za Twoje zainteresowanie naszą aplikacją!.
    <NewLine />
    Pozdrawiamy,
    <br />
    Zespół {Constants.APP_NAME}
  </>
);

export default AppOnboardingMailTemplateContent;
