import { redirect } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import getSubmissionById from '@/app/[locale]/(content)/submissions/[id]/(submission)/_utils/get-submission-by-id';
import TrainerProfileNameLink from '@/app/[locale]/(content)/submissions/[id]/_components/trainer-profile-name-link';
import MobileNavbarLink from '@/components/app-navbar/mobile-navbar/mobile-navbar-link';
import { triggerRootNotFound } from '@/utils';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import { Locale } from '@/utils/constants';
import getLoggedInUser from '@/utils/get-logged-in-user';
import SubmissionRequirementsForm from './_components/submission-requirements-form/submission-requirements-form';

const SubmissionRequirementsPage = async ({ params }: { params: { id: string; locale: Locale } }) => {
  unstable_setRequestLocale(params.locale);

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
        <MobileNavbarLink aria-label="Zgłoszenia" href="/submissions" icon="back" />
        <h1 className="text-2xl font-bold text-white">Szczegóły zamówienia</h1>
        <span className="text-white">
          Analiza techniki -{' '}
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
