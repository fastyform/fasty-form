import { Link, Text } from '@react-email/components';
import Constants from '@/utils/constants';
import MailTemplate from './mail-template';

// EXPORT AS HTML FROM 'npm run email' AND THEN PUT IT IN SUPABASE
const resetUrl = '{{ .SiteURL }}/api/auth/password-reset?token_hash={{ .TokenHash }}&redirect_to={{ .RedirectTo }}';
const ResetPassword = () => (
  <MailTemplate title="{{ .Data.ResetPassword.TITLE }}">
    <MailTemplate.CallToAction href={resetUrl}>{' {{.Data.ResetPassword.CTA}} '}</MailTemplate.CallToAction>
    <MailTemplate.LineBreak />
    {'{{ .Data.ResetPassword.INTRO }}'} <MailTemplate.AppLink />.
    <MailTemplate.LineBreak />
    {'{{ .Data.ResetPassword.CONTENT_1 }}'}
    <strong>{'{{ .Data.ResetPassword.CONTENT_2 }}'}</strong>
    <MailTemplate.LineBreak />
    {'{{ .Data.ResetPassword.CONTENT_3 }}'} <strong>{'{{ .Data.ResetPassword.CONTENT_4 }}'}</strong>.{' '}
    {'{{ .Data.ResetPassword.CONTENT_5 }}'}
    <MailTemplate.LineBreak />
    {'{{ .Data.ResetPassword.CONTENT_6 }}'}
    <br />
    {'{{ .Data.ResetPassword.CONTENT_7 }}'}
    <Text className="text-xs text-black/60">
      {'{{ .Data.ResetPassword.CONTENT_8 }}'}
      <br />
      <span className="break-all">{resetUrl}</span>
      <MailTemplate.LineBreak />
      {'{{ .Data.ResetPassword.CONTENT_9 }}'}{' '}
      <Link href={`mailto:${Constants.SUPPORT_MAIL}`}>{Constants.SUPPORT_MAIL}</Link>.
    </Text>
  </MailTemplate>
);

export default ResetPassword;
