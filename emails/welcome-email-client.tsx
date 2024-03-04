import Constants from '@/utils/constants';
import MailTemplate from './mail-template';

const WelcomeMailClient = () => (
  <MailTemplate title={`Witaj w ${Constants.APP_NAME}! Zadbaj o swoją technikę już dziś.`}>
    <MailTemplate.CallToAction href={`${Constants.ORIGIN_URL}/submissions`}>
      Sprawdź swoje możliwości
    </MailTemplate.CallToAction>
    <MailTemplate.Break />
    Super, że jesteś z nami.
    <MailTemplate.Break /> W <MailTemplate.AppLink /> czekają na Ciebie trenerzy gotowi przeanalizować Twoje wideo.
    Zajrzyj na ich profile, wybierz tego, który najbardziej Ci odpowiada, i zacznij swoją przygodę.
    <MailTemplate.Break />
    Będziesz miał jakiekolwiek pytania - jesteśmy tu dla Ciebie. Powodzenia!
  </MailTemplate>
);

export default WelcomeMailClient;
