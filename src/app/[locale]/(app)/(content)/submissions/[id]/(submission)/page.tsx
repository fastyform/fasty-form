import { Suspense } from 'react';
import dayjs from 'dayjs';
import dayjsUtc from 'dayjs/plugin/utc';
import { redirect } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import getSubmissionById from '@/app/[locale]/(app)/(content)/submissions/[id]/get-submission-by-id';
import TrainerProfileNameLink from '@/app/[locale]/(app)/(content)/submissions/[id]/trainer-profile-name-link';
import BuyButton from '@/app/[locale]/(app)/trainers/[slug]/_components/buy-button';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import { Locale } from '@/utils/constants';
import getLoggedInUser from '@/utils/get-logged-in-user';
import AddTrainerReviewForm from './_components/add-trainer-review-form';
import RequestNewVideo from './_components/request-new-video';
import SubmissionPartWithIcon from './_components/submission-part-with-icon';
import SubmissionVideo from './_components/submission-video';
import { VideoSkeleton } from './loading';

dayjs.extend(dayjsUtc);

const SubmissionPage = async ({ params }: { params: { id: string; locale: Locale } }) => {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations();
  const user = await getLoggedInUser();
  const [isTrainerAccount, submission] = await Promise.all([
    checkIsTrainerAccount(user.id),
    getSubmissionById(params.id),
  ]);

  if (submission.status === 'paid') {
    return redirect(`/submissions/${params.id}/requirements`);
  }

  const formattedCreationDate = dayjs(submission.created_at).fromNow();
  const formatDate = (date: string) => dayjs(date).format('D MMMM YYYY');

  if (!submission.trainers_details?.profile_name || !submission.trainers_details.profile_slug) throw new Error();

  if (isTrainerAccount) {
    return (
      <div className="flex flex-col gap-5 lg:flex-row lg:gap-10 xl:gap-40">
        <p className=" text-base text-white lg:hidden">
          <span className="font-bold">{t('SUBMISSION_CREATED_AT')}</span>
          <span> • {formattedCreationDate}</span>
        </p>
        <div className="flex shrink-0 flex-col gap-5 lg:order-2">
          <Suspense fallback={<VideoSkeleton />}>
            <SubmissionVideo submissionId={params.id} />
          </Suspense>
          {submission.status === 'unreviewed' && <RequestNewVideo />}
        </div>
        <div className="flex flex-col gap-5 lg:order-1 lg:grow">
          {!!submission.client_description && (
            <SubmissionPartWithIcon verticalLine icon="submission">
              <h2 className="text-lg font-bold leading-5 text-white">{t('SUBMISSION_TITLE_TRAINER')}</h2>
              <p className="whitespace-pre-wrap text-sm text-white">{submission.client_description}</p>
            </SubmissionPartWithIcon>
          )}

          {(submission.status === 'reviewed' || submission.status === 'paidout') && (
            <>
              <SubmissionPartWithIcon verticalLine icon="description">
                <h2 className="text-lg font-bold leading-5 text-white">
                  {t('SUBMISSION_TRAINER_REVIEW_FORM_REPLY_LABEL_TRAINER')}
                </h2>
                <p className="whitespace-pre-wrap text-sm text-white">{submission.trainer_review}</p>
              </SubmissionPartWithIcon>
              <SubmissionPartWithIcon icon="finished">
                <h2 className="text-lg font-bold text-yellow-400">{t('SUBMISSION_FINISHED_ORDER')}</h2>
                {submission.reviewed_at && (
                  <span className="whitespace-pre-wrap text-sm text-white">
                    {t('SUBMISSION_FINISHED_DATE')} •{' '}
                    <span className="font-bold">{formatDate(submission.reviewed_at)}</span>
                  </span>
                )}
                {submission.paidout_at && (
                  <span className="whitespace-pre-wrap text-sm text-white">
                    {t('SUBMISSION_PAIDOUT_AT')} •{' '}
                    <span className="font-bold">{formatDate(submission.paidout_at)}</span>
                  </span>
                )}
              </SubmissionPartWithIcon>
            </>
          )}

          {submission.status === 'unreviewed' && <AddTrainerReviewForm submissionId={params.id} />}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:gap-10 xl:gap-40">
      <p className=" text-base text-white lg:hidden">
        <span className="font-bold">{t('SUBMISSION_CREATED_AT')}</span>
        <span> • {formattedCreationDate}</span>
      </p>
      <TrainerProfileNameLink
        className="lg:hidden"
        profileImageUrl={submission.trainers_details.profile_image_url}
        profileName={submission.trainers_details.profile_name}
        trainerProfileSlug={submission.trainers_details.profile_slug}
      />
      <Suspense fallback={<VideoSkeleton />}>
        <SubmissionVideo submissionId={params.id} />
      </Suspense>
      <div className="flex flex-col gap-5 lg:order-1 lg:grow">
        {!!submission.client_description && (
          <SubmissionPartWithIcon verticalLine icon="submission">
            <h2 className="text-lg font-bold leading-5 text-white">{t('SUBMISSION_TITLE_CLIENT')}</h2>
            <p className="whitespace-pre-wrap text-sm text-white">{submission.client_description}</p>
          </SubmissionPartWithIcon>
        )}

        {(submission.status === 'reviewed' || submission.status === 'paidout') && (
          <>
            <SubmissionPartWithIcon verticalLine icon="description">
              <h2 className="text-lg font-bold leading-5 text-white">
                {t('SUBMISSION_TRAINER_REVIEW_FORM_REPLY_LABEL_CLIENT')}
              </h2>
              <p className="whitespace-pre-wrap text-sm text-white">{submission.trainer_review}</p>
            </SubmissionPartWithIcon>
            <SubmissionPartWithIcon verticalLine icon="finished">
              <h2 className="text-lg font-bold text-yellow-400">{t('SUBMISSION_FINISHED_ORDER')}</h2>
              {submission.reviewed_at && (
                <span className="whitespace-pre-wrap text-sm text-white">
                  {t('SUBMISSION_FINISHED_DATE')} •{' '}
                  <span className="font-bold">{formatDate(submission.reviewed_at)}</span>
                </span>
              )}
            </SubmissionPartWithIcon>
            <SubmissionPartWithIcon icon="buyAgain" iconClassName="text-white">
              <span className="text-white">{t('SUBMISSION_BUY_AGAIN_TITLE')}</span>
              <BuyButton className="self-start" trainerId={submission.trainer_id}>
                {t('SUBMISSION_BUY_AGAIN_BUTTON')}
              </BuyButton>
            </SubmissionPartWithIcon>
          </>
        )}

        {submission.status === 'unreviewed' && (
          <SubmissionPartWithIcon className="opacity-50" icon="submission">
            <h2 className="text-lg font-bold leading-5 text-white">
              {t('SUBMISSION_WAITING_FOR_TRAINER_REVIEW_TITLE')}
            </h2>
            <p className="text-sm text-white">{t('SUBMISSION_WAITING_FOR_TRAINER_REVIEW_CAPTION')}</p>
          </SubmissionPartWithIcon>
        )}
      </div>
    </div>
  );
};

export default SubmissionPage;
