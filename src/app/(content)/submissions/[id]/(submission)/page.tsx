import { Suspense } from 'react';
import dayjs from 'dayjs';
import dayjsUtc from 'dayjs/plugin/utc';
import { redirect } from 'next/navigation';
import TrainerProfileNameLink from '@/app/(content)/submissions/[id]/_components/trainer-profile-name-link';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getLoggedInUser from '@/utils/get-logged-in-user';
import SubmissionPartWithIcon from './_components/submission-part-with-icon';
import SubmissionVideo from './_components/submission-video';
import AddTrainerReviewForm from './_components/trainer-review-form/add-trainer-review-form';
import getSubmissionById from './_utils/get-submission-by-id';
import { VideoSkeleton } from './loading';
import 'dayjs/locale/pl';

dayjs.extend(dayjsUtc);
dayjs.locale('pl');

const SubmissionPage = async ({ params }: { params: { id: string } }) => {
  const user = await getLoggedInUser();
  const [isTrainerAccount, submission] = await Promise.all([
    checkIsTrainerAccount(user.id),
    getSubmissionById(params.id),
  ]);

  if (submission.status === 'paid') {
    return redirect(`/submissions/${params.id}/requirements`);
  }

  const formattedUpdateDate = dayjs(submission.updated_at).local().format('dddd HH:mm');
  const formattedFinishDate = dayjs(submission.updated_at).local().format('D MMMM');

  if (!submission.trainers_details?.profile_name || !submission.trainers_details.profile_slug) throw new Error();

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:gap-10 xl:gap-40">
      <p className=" text-base text-white lg:hidden">
        <span className="font-bold">Ostatnia zmiana: </span>
        <span className="capitalize">{formattedUpdateDate}</span>
      </p>
      <TrainerProfileNameLink
        className="lg:hidden"
        profileName={submission.trainers_details.profile_name}
        trainerProfileSlug={submission.trainers_details.profile_slug}
      />
      <Suspense fallback={<VideoSkeleton />}>
        <SubmissionVideo submissionId={params.id} />
      </Suspense>
      <div className="flex flex-col gap-5 lg:order-1 lg:grow">
        {!!submission.client_description && (
          <SubmissionPartWithIcon verticalLine icon="submission">
            <h2 className="text-lg font-bold leading-5 text-white">
              {isTrainerAccount ? 'Zgłoszenie klienta' : 'Twoje zgłoszenie'}
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
              <h2 className="text-lg font-bold text-yellow-400">Zamówienie zakończone</h2>
              <span className="whitespace-pre-wrap text-sm text-white">
                Data wykonania <span className="font-bold capitalize">{formattedFinishDate}</span>
              </span>
            </SubmissionPartWithIcon>
          </>
        )}

        {submission.status === 'unreviewed' &&
          (isTrainerAccount ? (
            <AddTrainerReviewForm submissionId={params.id} />
          ) : (
            <SubmissionPartWithIcon containerStyles="opacity-50" icon="submission">
              <h2 className="text-lg font-bold leading-5 text-white">Oczekiwanie na odpowiedź trenera...</h2>
              <p className="text-sm text-white">
                Po tym, jak trener oceni Twoje wideo, znajdziesz tutaj jego komentarz i sugestie.
              </p>
            </SubmissionPartWithIcon>
          ))}
      </div>
    </div>
  );
};

export default SubmissionPage;
