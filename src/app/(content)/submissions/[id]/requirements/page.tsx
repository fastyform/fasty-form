import { redirect } from 'next/navigation';
import MobileNavbarLink from '@/app/(content)/_components/navbar/mobile-navbar/mobile-navbar-link';
import getSubmissionById from '@/app/(content)/submissions/[id]/(submission)/_utils/get-submission-by-id';
import TrainerProfileNameLink from '@/app/(content)/submissions/[id]/_components/trainer-profile-name-link';
import AppLogo from '@/components/app-logo';
import { triggerRootNotFound } from '@/utils';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getUserFromSession from '@/utils/get-user-from-session';
import SubmissionRequirementsForm from './_components/submission-requirements-form';

const SubmissionRequirementsPage = async ({ params }: { params: { id: string } }) => {
  const [user, submission] = await Promise.all([getUserFromSession(), getSubmissionById(params.id)]);

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
      <div className="relative flex justify-center lg:hidden">
        <MobileNavbarLink aria-label="Zgłoszenia" className="absolute left-0" href="/submissions" icon="back" />
        <AppLogo />
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-white">Szczegóły zamówienia</h1>
        <TrainerProfileNameLink
          profileName={submission.trainers_details.profile_name}
          trainerProfileSlug={submission.trainers_details.profile_slug}
        />
      </div>
      <SubmissionRequirementsForm submissionId={params.id} />
    </div>
  );
};

export default SubmissionRequirementsPage;
