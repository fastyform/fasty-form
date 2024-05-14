import { Suspense } from 'react';
import dayjs from 'dayjs';
import dayjsUtc from 'dayjs/plugin/utc';
import { redirect } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import getSubmissionById from '@/app/[locale]/(content)/submissions/[id]/get-submission-by-id';
import TrainerProfileNameLink from '@/app/[locale]/(content)/submissions/[id]/trainer-profile-name-link';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import { Locale } from '@/utils/constants';
import getLoggedInUser from '@/utils/get-logged-in-user';
import SubmissionPartWithIcon from './_components/submission-part-with-icon';
import SubmissionVideo from './_components/submission-video';
import AddTrainerReviewForm from './_components/trainer-review-form/add-trainer-review-form';
import { VideoSkeleton } from './loading';

dayjs.extend(dayjsUtc);

const SubmissionPage = async ({ params }: { params: { id: string; locale: Locale } }) => {
  unstable_setRequestLocale(params.locale);
  dayjs.locale(params.locale);
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

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:gap-10 xl:gap-40">
      <p className=" text-base text-white lg:hidden">
        <span className="font-bold">{t('SUBMISSION_CREATED_AT')}</span>
        <span className="capitalize"> • {formattedCreationDate}</span>
      </p>
      {!isTrainerAccount && (
        <TrainerProfileNameLink
          className="lg:hidden"
          profileName={submission.trainers_details.profile_name}
          trainerProfileSlug={submission.trainers_details.profile_slug}
        />
      )}
      <Suspense fallback={<VideoSkeleton />}>
        <SubmissionVideo submissionId={params.id} />
      </Suspense>
      <div className="flex flex-col gap-5 lg:order-1 lg:grow">
        {!!submission.client_description && (
          <SubmissionPartWithIcon verticalLine icon="submission">
            <h2 className="text-lg font-bold leading-5 text-white">
              {t(isTrainerAccount ? 'SUBMISSION_TITLE_TRAINER' : 'SUBMISSION_TITLE_CLIENT')}
            </h2>
            <p className="whitespace-pre-wrap text-sm text-white">{submission.client_description}</p>
          </SubmissionPartWithIcon>
        )}

        {(submission.status === 'reviewed' || submission.status === 'paidout') && (
          <>
            <SubmissionPartWithIcon verticalLine icon="description">
              <h2 className="text-lg font-bold leading-5 text-white">
                {isTrainerAccount ? 'Twoja odpowiedź' : 'Odpowiedź trenera'}
              </h2>
              <p className="whitespace-pre-wrap text-sm text-white">{submission.trainer_review}</p>
            </SubmissionPartWithIcon>
            <SubmissionPartWithIcon icon="finished">
              <h2 className="text-lg font-bold text-yellow-400">{t('SUBMISSION_FINISHED_ORDER')}</h2>
              {submission.reviewed_at && (
                <span className="whitespace-pre-wrap text-sm text-white">
                  {t('SUBMISSION_FINISHED_DATE')} •{' '}
                  <span className="font-bold capitalize">{formatDate(submission.reviewed_at)}</span>
                </span>
              )}
              {submission.paidout_at && (
                <span className="whitespace-pre-wrap text-sm text-white">
                  {t('SUBMISSION_PAIDOUT_AT')} •{' '}
                  <span className="font-bold capitalize">{formatDate(submission.paidout_at)}</span>
                </span>
              )}
            </SubmissionPartWithIcon>
          </>
        )}

        {submission.status === 'unreviewed' &&
          (isTrainerAccount ? (
            <AddTrainerReviewForm submissionId={params.id} />
          ) : (
            <SubmissionPartWithIcon className="opacity-50" icon="submission">
              <h2 className="text-lg font-bold leading-5 text-white">
                {t('SUBMISSION_WAITING_FOR_TRAINER_REVIEW_TITLE')}
              </h2>
              <p className="text-sm text-white">{t('SUBMISSION_WAITING_FOR_TRAINER_REVIEW_CAPTION')}</p>
            </SubmissionPartWithIcon>
          ))}
      </div>
    </div>
  );
};

export default SubmissionPage;
