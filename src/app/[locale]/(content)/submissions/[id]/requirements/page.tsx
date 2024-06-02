import { redirect } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import getSubmissionById from '@/app/[locale]/(content)/submissions/[id]/get-submission-by-id';
import TrainerProfileNameLink from '@/app/[locale]/(content)/submissions/[id]/trainer-profile-name-link';
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

  if (submission.status !== 'paid') {
    return redirect(`/submissions/${params.id}`);
  }

  const isTrainerAccount = await checkIsTrainerAccount(user.id);

  if (isTrainerAccount) {
    return triggerRootNotFound();
  }

  if (!submission.trainers_details?.profile_name || !submission.trainers_details?.profile_slug) {
    throw new Error('Trainer profile name or slug is missing');
  }

  return (
    <div className="flex w-full max-w-[500px] flex-col gap-8 self-center">
      <div className="flex flex-col gap-5">
        <MobileNavigationIconLink aria-label="Zgłoszenia" href="/submissions" icon="back" />
        <h1 className="text-2xl font-bold text-white">{t('SUBMISSION_REQUIREMENTS_TITLE')}</h1>
        <span className="text-white">
          {t('SUBMISSION_REQUIREMENTS_FORM_CHECK')} -{' '}
          <TrainerProfileNameLink
            profileName={submission.trainers_details.profile_name}
            trainerProfileSlug={submission.trainers_details.profile_slug}
          />
        </span>
      </div>
      <SubmissionRequirementsForm submissionId={params.id} />
    </div>
  );
};

export default SubmissionRequirementsPage;
