import { redirect } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import getSubmissionById from '@/app/[locale]/(app)/(content)/submissions/[id]/get-submission-by-id';
import TrainerProfileNameLink from '@/app/[locale]/(app)/(content)/submissions/[id]/trainer-profile-name-link';
import MobileNavigationIconLink from '@/components/mobile-navigation-icon-link';
import { triggerRootNotFound } from '@/utils';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import { Locale } from '@/utils/constants';
import getLoggedInUser from '@/utils/get-logged-in-user';
import SubmissionRequirementsForm from './_components/submission-requirements-form/submission-requirements-form';

const SubmissionRequirementsPage = async ({ params }: { params: { id: string; locale: Locale } }) => {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations();
  const [user, submission] = await Promise.all([getLoggedInUser(), getSubmissionById(params.id)]);

  if (submission.status !== 'paid' && submission.status !== 'video_request') {
    return redirect(`/submissions/${params.id}`);
  }

  const isTrainerAccount = await checkIsTrainerAccount(user.id);

  if (isTrainerAccount) {
    return triggerRootNotFound();
  }

  if (!submission.trainers_details?.profile_name || !submission.trainers_details?.profile_slug) {
    throw new Error('Trainer profile name or slug is missing');
  }

  const titleKey =
    submission.status === 'paid' ? 'SUBMISSION_REQUIREMENTS_TITLE' : 'SUBMISSION_REQUIREMENTS_VIDEO_REQUEST_TITLE';

  return (
    <div className="flex w-full max-w-[500px] flex-col gap-8 self-center text-white">
      <div className="flex flex-col gap-5">
        <MobileNavigationIconLink aria-label="Zgłoszenia" href="/submissions" icon="back" />
        <h1 className="text-2xl font-bold">{t(titleKey)}</h1>
        <span>
          <TrainerProfileNameLink
            profileImageUrl={submission.trainers_details.profile_image_url}
            profileName={submission.trainers_details.profile_name}
            trainerProfileSlug={submission.trainers_details.profile_slug}
          />
        </span>
        {submission.status === 'video_request' && (
          <>
            <p>{t('SUBMISSION_REQUIREMENTS_VIDEO_REQUEST_DESCRIPTION')}: </p>
            <p className="py-2.5 italic text-yellow-400">&quot;{submission.new_video_request_description}&quot;</p>
          </>
        )}
      </div>
      <SubmissionRequirementsForm clientDescription={submission.client_description} submissionId={params.id} />
    </div>
  );
};

export default SubmissionRequirementsPage;
