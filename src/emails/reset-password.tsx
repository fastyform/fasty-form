import { Link, Text } from '@react-email/components';
import Constants from '@/utils/constants';
import MailTemplate from './mail-template';

// EXPORT AS HTML FROM 'npm run email' AND THEN PUT IT IN SUPABASE
const ResetPassword = () => (
  <MailTemplate title="Resetowanie hasła">
    <MailTemplate.CallToAction href="{{ .SiteURL }}/api/auth/password-reset?token_hash={{ .TokenHash }}&redirect_to={{ .RedirectTo }}">
      Zresetuj hasło
    </MailTemplate.CallToAction>
    <MailTemplate.LineBreak />
    Otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta <MailTemplate.AppLink />.
    <MailTemplate.LineBreak />
    Jeśli nie wysłałeś tej prośby, możesz zignorować tę wiadomość.{' '}
    <strong>W przeciwnym razie, proszę kliknąć przycisk powyżej, aby ustawić nowe hasło.</strong>
    <MailTemplate.LineBreak />
    Pamiętaj, że link do resetowania hasła wygaśnie w ciągu <strong>24 godzin</strong>. Po tym czasie będziesz musiał
    ponownie złożyć wniosek o resetowanie hasła.
    <MailTemplate.LineBreak /> Dziękujemy za korzystanie z FastFormy!
    <br />
    Zespół FastFormy.
    <Text className="text-xs text-black/60">
      Jeśli masz problem z linkami, skopiuj i wklej następujący adres w przeglądarce:{' '}
      {'{{ .SiteURL }}/api/auth/password-reset?token_hash={{ .TokenHash }}&redirect_to={{ .RedirectTo }}'}
      <MailTemplate.LineBreak /> Możesz też skontaktować się z nami wysyłając wiadomość na adres:{' '}
      <Link href={`mailto:${Constants.SUPPORT_MAIL}`}>{Constants.SUPPORT_MAIL}</Link>.
    </Text>
  </MailTemplate>
);

export default ResetPassword;
