import { Link } from '@react-email/components';
import Constants from '@/utils/constants';
import MailTemplate from './mail-template';

const AddedReview = ({
  profileName,
  trainerProfileSlug,
  submissionId,
}: {
  profileName: string | null;
  trainerProfileSlug: string;
  submissionId: string;
}) => (
  <MailTemplate title="Twoja Analiza Wideo Jest Gotowa!">
    <MailTemplate.CallToAction href={`${Constants.ORIGIN_URL}/submissions/${submissionId}`}>
      Sprawdź odpowiedź trenera
    </MailTemplate.CallToAction>
    <MailTemplate.Break />
    Mamy świetne wieści - Twoja analiza wideo od{' '}
    <Link href={`${Constants.ORIGIN_URL}/trainers/${trainerProfileSlug}`}>{profileName}</Link> jest już gotowa! Trener
    przyjrzał się dokładnie Twojemu nagraniu i ma kilka cennych wskazówek, które pomogą Ci doskonalić Twoje
    umiejętności.
    <MailTemplate.Break />
    Aby zobaczyć analizę Twojej techniki{' '}
    <Link href={`${Constants.ORIGIN_URL}/submissions/${submissionId}`}>kliknij tutaj</Link>, albo wystarczy, że:
    <MailTemplate.Break />
    1. Zalogujesz się do <MailTemplate.AppLink />
    <br />
    2.Przejdź do zakładki &apos;Zgłoszenia&apos;. <br />
    3.Kliknij w zgłoszenie, aby zobaczyć pełną analizę trenera.
    <MailTemplate.Break />
    Jesteśmy przekonani, że wskazówki od ekspertów będą dla Ciebie niezwykle wartościowe. Nie zapomnij podzielić się z
    nami swoimi wrażeniami!
    <MailTemplate.Break />
    Jeśli masz jakiekolwiek pytania lub potrzebujesz dodatkowej pomocy, nasz zespół jest tu dla Ciebie.{' '}
    <Link href={`${Constants.ORIGIN_URL}/contact`}>Napisz do nas</Link>, a z chęcią pomożemy.
    <MailTemplate.Break />
    Pozdrawiamy,
    <br />
    Zespół {Constants.APP_NAME}
  </MailTemplate>
);

export default AddedReview;
