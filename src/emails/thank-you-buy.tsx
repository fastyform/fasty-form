import { Link } from '@react-email/components';
import Constants from '@/utils/constants';
import MailTemplate from './mail-template';

const ThankYouBuy = ({
  submissionId,
  trainerProfileName,
  trainerProfileSlug,
}: {
  submissionId: string;
  trainerProfileName: string;
  trainerProfileSlug: string;
}) => (
  <MailTemplate title="Jesteśmy gotowi na Twoje wideo.">
    <MailTemplate.CallToAction href={`${Constants.ORIGIN_URL}/submissions/${submissionId}/requirements`}>
      Dodaj wideo do swojego zgłoszenia
    </MailTemplate.CallToAction>
    <MailTemplate.LineBreak />
    Cześć! <MailTemplate.LineBreak /> Dziękujemy za dokonanie zakupu analizy wideo w <MailTemplate.AppLink />, u trenera{' '}
    <Link href={`${Constants.ORIGIN_URL}/trainers/${trainerProfileSlug}`}>{trainerProfileName}.</Link>
    <MailTemplate.LineBreak />
    Wraz z trenerem chcielibyśmy Ci podziękować. Jesteśmy podekscytowani, że możemy pomóc Ci w osiągnięciu nowych celów!
    Teraz wszystko, co musisz zrobić, to przesłać nam swoje wideo. <MailTemplate.LineBreak />{' '}
    <strong>Swoje zgłoszenie znajdziesz w zakładce &apos;Zgłoszenia&apos; w naszej aplikacji</strong> - tam będziesz
    mógł łatwo dodać swoje wideo i wszelkie dodatkowe uwagi, które chcesz przekazać trenerowi.
    <MailTemplate.LineBreak />
    <strong> Jeśli jeszcze nie wypełniłeś szczegółów, to proste, </strong>
    <Link href={`${Constants.ORIGIN_URL}/submissions/${submissionId}/requirements`}>kliknij tutaj</Link>
    , albo:
    <br /> 1. Wejdź do zakładki &apos;Zgłoszenia&apos; w aplikacji.
    <br /> 2. Wybierz zgłoszenie, które Cię interesuje.
    <br /> 3. Kliknij w przycisk &apos;Wgraj Wideo&apos;.
    <br />
    4.Wybierz wideo, które chcesz przesłać, i dodaj uwagi.
    <br /> 5.Kliknij &apos;Wyślij&apos;, a my zajmiemy się resztą!
    <MailTemplate.LineBreak />
    Twoja analiza wideo będzie gotowa zanim się obejrzysz.{' '}
    <strong>Damy Ci znać, jak tylko wszystko będzie gotowe!</strong>
    <MailTemplate.LineBreak /> Masz pytania? Potrzebujesz pomocy?{' '}
    <Link href={`${Constants.ORIGIN_URL}/contact`}>Napisz do nas</Link>, chętnie pomożemy. Do zobaczenia w{' '}
    {Constants.APP_NAME}!
    <MailTemplate.LineBreak /> Pozdrawiamy,
    <br /> Zespół {Constants.APP_NAME}
  </MailTemplate>
);

export default ThankYouBuy;
