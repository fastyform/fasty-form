import { Fragment, ReactNode } from 'react';
import { Link } from '@react-email/components';
import Constants from '@/utils/constants';
import { IntlShape } from '@/utils/types';
import MailTemplate from './mail-template';

interface AddedReviewProps {
  profileName: string | null;
  trainerProfileSlug: string;
  submissionId: string;
  t: IntlShape;
}

const AddedReview = ({ profileName, trainerProfileSlug, submissionId, t }: AddedReviewProps) => (
  <MailTemplate title={t('MAIL_TEMPLATE_ADDED_REVIEW_TITLE')}>
    <MailTemplate.CallToAction href={`${Constants.ORIGIN_URL}/submissions/${submissionId}`}>
      {t('MAIL_TEMPLATE_ADDED_REVIEW_CTA')}
    </MailTemplate.CallToAction>
    <MailTemplate.LineBreak />
    {t.rich('MAIL_TEMPLATE_ADDED_REVIEW_CONTENT_1', {
      TrainerLink: () => <Link href={`${Constants.ORIGIN_URL}/trainers/${trainerProfileSlug}`}>{profileName}</Link>,
    })}
    <MailTemplate.LineBreak />
    <strong>
      {t.rich('MAIL_TEMPLATE_ADDED_REVIEW_CONTENT_2', {
        SubmissionLink: (chunks: ReactNode) => (
          <Link href={`${Constants.ORIGIN_URL}/submissions/${submissionId}`}>{chunks}</Link>
        ),
      })}
    </strong>
    {(['1', '2', '3'] as const).map((index) => (
      <Fragment key={index}>
        <br />
        {index}. {t.rich(`MAIL_TEMPLATE_ADDED_REVIEW_CONTENT_3_${index}`)}
      </Fragment>
    ))}
    <MailTemplate.LineBreak />
    {t.rich('MAIL_TEMPLATE_ADDED_REVIEW_CONTENT_4')}
    <MailTemplate.LineBreak />
    {t.rich('MAIL_TEMPLATE_ADDED_REVIEW_CONTENT_5')}
    <MailTemplate.Greetings t={t} />
  </MailTemplate>
);

export default AddedReview;
