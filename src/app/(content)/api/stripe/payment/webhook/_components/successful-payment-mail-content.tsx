import Constants from '@/utils/constants';

const SuccessfulPaymentMailContent = ({
  submissionId,
  trainerProfileName,
  trainerProfileSlug,
}: {
  submissionId: string;
  trainerProfileName: string;
  trainerProfileSlug: string;
}) => (
  <>
    Cześć! Dziękujemy za dokonanie zakupu analizy wideo w {Constants.APP_NAME}, u trenera{' '}
    <a href={`${Constants.ORIGIN_URL}/trainers/${trainerProfileSlug}`}>{trainerProfileName}.</a>
    <br />
    <br />
    Wraz z trenerem chcielibyśmy Ci podziękować. Jesteśmy podekscytowani, że możemy pomóc Ci w osiągnięciu nowych celów!
    Teraz wszystko, co musisz zrobić, to przesłać nam swoje wideo. Swoje zgłoszenie znajdziesz w zakładce
    &apos;Zgłoszenia&apos; w naszej aplikacji - tam będziesz mógł łatwo dodać swoje wideo i wszelkie dodatkowe uwagi,
    które chcesz przekazać trenerowi.
    <br />
    <br /> Jeśli jeszcze nie wypełniłeś szczegółów, to proste,{' '}
    <a href={`${Constants.ORIGIN_URL}/submissions/${submissionId}/requirements`}>kliknij tutaj</a>
    , albo:
    <br /> 1.Wejdź do zakładki &apos;Zgłoszenia&apos; w aplikacji.
    <br /> 2.Wybierz zgłoszenie, które Cię interesuje.
    <br /> 3.Kliknij w przycisk &apos;Wgraj Wideo&apos;.
    <br />
    4.Wybierz wideo, które chcesz przesłać, i dodaj uwagi.
    <br /> 5.Kliknij &apos;Wyślij&apos;, a my zajmiemy się resztą!
    <br />
    <br /> Twoja analiza wideo będzie gotowa zanim się obejrzysz. Damy Ci znać, jak tylko wszystko będzie gotowe! Masz
    pytania? Potrzebujesz pomocy? <a href={`${Constants.ORIGIN_URL}/contact`}>Napisz do nas</a>, chętnie pomożemy. Do
    zobaczenia w {Constants.APP_NAME}!
    <br />
    <br /> Pozdrawiamy,
    <br /> Zespół {Constants.APP_NAME}
  </>
);

export default SuccessfulPaymentMailContent;
