import { IntlShape } from '@/utils/types';
import MailTemplate from './mail-template';

interface AddedReviewProps {
  profileName: string | null;
  t: IntlShape;
  formLink: string;
}

const ClientServiceReview = ({ formLink, profileName, t }: AddedReviewProps) => (
  <MailTemplate title={t.rich('MAIL_TEMPLATE_CLIENT_SERVICE_REVIEW_TITLE')}>
    <MailTemplate.CallToAction href={formLink}>
      {t('MAIL_TEMPLATE_CLIENT_SERVICE_REVIEW_CTA')}
    </MailTemplate.CallToAction>
    <MailTemplate.LineBreak />
    {t.rich('MAIL_TEMPLATE_CLIENT_SERVICE_REVIEW_CONTENT_1', { profileName })}
    <MailTemplate.LineBreak />
    {t('MAIL_TEMPLATE_CLIENT_SERVICE_REVIEW_CONTENT_2')}
    <MailTemplate.LineBreak />
    {t('MAIL_TEMPLATE_CLIENT_SERVICE_REVIEW_CONTENT_3')}
    <MailTemplate.Greetings t={t} />
  </MailTemplate>
);

export default ClientServiceReview;
