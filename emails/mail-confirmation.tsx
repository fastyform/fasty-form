import { Link, Text } from '@react-email/components';
import { PRODUCTION_ORIGIN_URL } from '@/utils/constants';
import MailTemplate from './mail-template';

// EXPORT AS HTML FROM 'npm run email' AND THEN PUT IT IN SUPABASE
const MailConfirmation = () => (
  <MailTemplate title="Ostatni krok do zakończenia rejestracji!">
    <MailTemplate.CallToAction href="{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&redirect_to={{ .RedirectTo }}">
      Potwierdź swój adres e-mail
    </MailTemplate.CallToAction>
    <MailTemplate.Break />
    Witaj w <MailTemplate.AppLink />!
    <MailTemplate.Break />
    Dziękujemy za dołączenie do nas! Jesteśmy podekscytowani, że zdecydowałeś się być częścią naszej grupy. Twoje
    doświadczenia, opinie i obecność są dla nas bardzo ważne. Zachęcamy do aktywnego udziału i dzielenia się swoimi
    pomysłami. Pamiętaj, że zawsze jesteśmy tutaj, aby Ci pomóc.
    <MailTemplate.Break /> Jeśli masz jakiekolwiek pytania, wątpliwości lub potrzebujesz wsparcia, nasz zespół jest do
    Twojej dyspozycji. <Link href={`${PRODUCTION_ORIGIN_URL}/contact`}>Skontaktuj się</Link> z nami w dowolnym momencie
    - z radością odpowiemy na każde zapytanie.
    <MailTemplate.Break />
    Jeszcze raz dziękujemy i serdecznie witamy!
    <br />
    Zespół FastyForm.
    <MailTemplate.Break />
    <Text className="text-xs text-black/60">
      Jeśli nie rejestrowałeś się na stronie FastyForm, zignoruj tę wiadomość.
    </Text>
    <Text className="text-xs text-black/60">
      Jeśli masz problem z linkami, skopiuj i wklej następujący adres w przeglądarce:{' '}
      {'{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&redirect_to={{ .RedirectTo }}'}
      <MailTemplate.Break /> Możesz też skontaktować się z nami wysyłając wiadomość na adres:{' '}
      <Link href="mailto:support@fastyform.com">support@fastyform.com</Link>.
    </Text>
  </MailTemplate>
);

export default MailConfirmation;
