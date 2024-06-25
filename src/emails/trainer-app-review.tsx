import { IntlShape } from '@/utils/types';
import MailTemplate from './mail-template';

interface TrainerAppReviewProps {
  profileName: string;
  t: IntlShape;
  formLink: string;
}

const TrainerAppReview = ({ formLink, profileName, t }: TrainerAppReviewProps) => (
  <MailTemplate title={t.rich('MAIL_TEMPLATE_TRAINER_APP_REVIEW_TITLE')}>
    <MailTemplate.CallToAction href={formLink}>{t('MAIL_TEMPLATE_TRAINER_APP_REVIEW_CTA')}</MailTemplate.CallToAction>
    <MailTemplate.LineBreak />
    {t.rich('MAIL_TEMPLATE_TRAINER_APP_REVIEW_INTRO', { profileName })}
    <MailTemplate.LineBreak />
    {t.rich('MAIL_TEMPLATE_TRAINER_APP_REVIEW_CONTENT_1')}
    <MailTemplate.LineBreak />
    {t('MAIL_TEMPLATE_TRAINER_APP_REVIEW_CONTENT_2')}
    <MailTemplate.LineBreak />
    {t('MAIL_TEMPLATE_TRAINER_APP_REVIEW_CONTENT_3')}
    <MailTemplate.Greetings t={t} />
  </MailTemplate>
);

export default TrainerAppReview;
