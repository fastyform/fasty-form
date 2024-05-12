import { Link, Text } from '@react-email/components';
import MailTemplate from '@/emails/mail-template';
import Constants, { PRODUCTION_ORIGIN_URL } from '@/utils/constants';

// EXPORT AS HTML FROM 'npm run email' AND THEN PUT IT IN SUPABASE
const verifyUrl = '{{ .SiteURL }}/api/auth/verify?token_hash={{ .TokenHash }}&redirect_to={{ .RedirectTo }}';
const MailConfirmation = () => (
  <MailTemplate title="{{ .Data.ConfirmSignup.TITLE }}">
    <MailTemplate.CallToAction href={verifyUrl}>{'{{ .Data.ConfirmSignup.CTA }}'}</MailTemplate.CallToAction>
    <MailTemplate.LineBreak />
    {'{{ .Data.ConfirmSignup.INTRO }}'} <MailTemplate.AppLink />!
    <MailTemplate.LineBreak />
    {'{{ .Data.ConfirmSignup.CONTENT_1 }}'} <strong>{'{{ .Data.ConfirmSignup.CONTENT_2 }}'}</strong>{' '}
    {'{{ .Data.ConfirmSignup.CONTENT_3 }}'}
    <MailTemplate.LineBreak />
    {'{{ .Data.ConfirmSignup.CONTENT_4 }}'}{' '}
    <Link href={`${PRODUCTION_ORIGIN_URL}/contact`}> {'{{ .Data.ConfirmSignup.CONTENT_5 }}'}</Link>{' '}
    {'{{ .Data.ConfirmSignup.CONTENT_6 }}'}
    <MailTemplate.LineBreak />
    {'{{ .Data.ConfirmSignup.CONTENT_7 }}'}
    <br />
    {'{{ .Data.ConfirmSignup.CONTENT_8 }}'}
    <MailTemplate.LineBreak />
    <Text className="text-xs text-black/60">{'{{.Data.ConfirmSignup.CONTENT_9}}'}</Text>
    <Text className="text-xs text-black/60 [word-break:break-word]">
      {'{{ .Data.ConfirmSignup.CONTENT_10 }}'}
      <br />
      {verifyUrl}
      <MailTemplate.LineBreak />
      {'{{ .Data.ConfirmSignup.CONTENT_11 }}'}{' '}
      <Link href={`mailto:${Constants.SUPPORT_MAIL}`}>{Constants.SUPPORT_MAIL}</Link>.
    </Text>
  </MailTemplate>
);

export default MailConfirmation;
