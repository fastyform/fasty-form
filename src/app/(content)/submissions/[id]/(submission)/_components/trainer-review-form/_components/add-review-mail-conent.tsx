import Constants from '@/utils/constants';

const AddReviewMailContent = ({
  profileName,
  trainerProfileSlug,
  submissionId,
}: {
  profileName: string | null;
  trainerProfileSlug: string;
  submissionId: string;
}) => (
  <>
    Mamy świetne wieści - Twoja analiza wideo od{' '}
    <a href={`${Constants.ORIGIN_URL}/trainers/${trainerProfileSlug}`}>{profileName}</a> jest już gotowa! Trener
    przyjrzał się dokładnie Twojemu nagraniu i ma kilka cennych wskazówek, które pomogą Ci doskonalić Twoje
    umiejętności.
    <br />
    <br />
    Aby zobaczyć analizę <a href={`${Constants.ORIGIN_URL}/submissions/${submissionId}`}>kliknij tutaj</a>, albo
    wystarczy, że:
    <br />
    <br />
    1.Zalogujesz się do {Constants.APP_NAME}.
    <br />
    2.Przejdź do zakładki &apos;Zgłoszenia&apos;. <br />
    3.Kliknij w zgłoszenie, aby zobaczyć pełną analizę trenera.
    <br />
    <br />
    Jesteśmy przekonani, że wskazówki od ekspertów będą dla Ciebie niezwykle wartościowe. Nie zapomnij podzielić się z
    nami swoimi wrażeniami!
    <br />
    <br />
    Jeśli masz jakiekolwiek pytania lub potrzebujesz dodatkowej pomocy, nasz zespół jest tu dla Ciebie.{' '}
    <a href={`${Constants.ORIGIN_URL}/contact`}>Napisz do nas</a>, a z chęcią pomożemy.
    <br />
    <br />
    Pozdrawiamy,
    <br />
    Zespół {Constants.APP_NAME}
  </>
);

export default AddReviewMailContent;
