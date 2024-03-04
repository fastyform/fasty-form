import Constants from '@/utils/constants';
import MailTemplate from './mail-template';

const WelcomeMailTrainer = () => (
  <MailTemplate title="Witamy na pokładzie, Trenerze!">
    <MailTemplate.CallToAction href={`${Constants.ORIGIN_URL}/submissions`}>
      Sprawdź swoje możliwości
    </MailTemplate.CallToAction>
    <MailTemplate.Break />
    Cieszymy się, że dołączyłeś do rodziny <MailTemplate.AppLink />. <MailTemplate.Break /> Twoje doświadczenie i wiedza
    są dla nas na wagę złota. Sprawdź, jak łatwo analizować duże ilości wideo od swojej społeczności i dzielić się
    swoimi eksperckimi analizami techniki. <MailTemplate.Break />
    Jakby coś, jesteśmy tu, aby Ci pomóc. Do dzieła!
  </MailTemplate>
);

export default WelcomeMailTrainer;
