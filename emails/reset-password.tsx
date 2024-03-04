import { Link, Text } from '@react-email/components';
import MailTemplate from './mail-template';

// EXPORT AS HTML FROM 'npm run email' AND THEN PUT IT IN SUPABASE
const ResetPassword = () => (
  <MailTemplate title="Resetowanie hasła">
    <MailTemplate.CallToAction href="{{ .SiteURL }}/auth/password-reset?token_hash={{ .TokenHash }}&redirect_to={{ .RedirectTo }}">
      Zresetuj hasło
    </MailTemplate.CallToAction>
    <MailTemplate.Break />
    Otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta <MailTemplate.AppLink />.
    <MailTemplate.Break />
    Jeśli nie wysłałeś tej prośby, możesz zignorować tę wiadomość. W przeciwnym razie, proszę kliknąć przycisk powyżej,
    aby ustawić nowe hasło.
    <MailTemplate.Break />
    Pamiętaj, że link do resetowania hasła wygaśnie w ciągu 24 godzin. Po tym czasie będziesz musiał ponownie złożyć
    wniosek o resetowanie hasła.
    <MailTemplate.Break /> Dziękujemy za korzystanie z FastForm!
    <br />
    Zespół FastForm.
    <Text className="text-xs text-black/60">
      Jeśli masz problem z linkami, skopiuj i wklej następujący adres w przeglądarce:{' '}
      {'{{ .SiteURL }}/auth/password-reset?token_hash={{ .TokenHash }}&redirect_to={{ .RedirectTo }}'}
      <MailTemplate.Break /> Możesz też skontaktować się z nami wysyłając wiadomość na adres:{' '}
      <Link href="mailto:support@fastyform.com">support@fastyform.com</Link>.
    </Text>
  </MailTemplate>
);

export default ResetPassword;
