import Constants from '@/utils/constants';

const RequirementsSentMailContent = ({ trainerName, submissionId }: { trainerName: string; submissionId: string }) => (
  <>
    Cześć {trainerName}!
    <br />
    <br /> Mamy świetne wieści - pojawiło się nowe zgłoszenie od klienta w {Constants.APP_NAME}. Klient właśnie
    uzupełnił szczegóły swojego zgłoszenia i jest gotowy do rozpoczęcia pracy z Tobą.
    <br />
    <br /> Oto co musisz zrobić, <a href={`${Constants.ORIGIN_URL}/submissions/${submissionId}`}>kliknij tutaj</a>,
    albo:
    <br /> 1. Zaloguj się do swojego konta na {Constants.APP_NAME}.
    <br /> 2. Przejdź do zakładki &apos;Zgłoszenia&apos;.
    <br /> 3. Wybierz nowe zgłoszenie.
    <br /> 4. Wyślij informację zwrotną na temat przesłanego wideo.
    <br />
    <br /> Jesteśmy przekonani, że Twoja wiedza i doświadczenie będą kluczowe w osiąganiu celów Twoich podopiecznych.
    <br />
    <br /> Jeśli masz jakiekolwiek pytania lub potrzebujesz wsparcia, skontaktuj się z nami przez{' '}
    <a href={`${Constants.ORIGIN_URL}/contact`}>formularz kontaktowy </a>. Jesteśmy tutaj, aby Ci pomóc.
    <br />
    <br /> Dziękujemy za Twoje zaangażowanie i ciężką pracę w {Constants.APP_NAME}.
    <br />
    <br /> Pozdrawiamy,
    <br /> Zespół {Constants.APP_NAME}
  </>
);

export default RequirementsSentMailContent;
