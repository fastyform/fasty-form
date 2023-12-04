import { redirect } from 'next/navigation';
import MobileNavbarLink from '@/app/(content)/_components/navbar/mobile-navbar/mobile-navbar-link';
import getSubmissionById from '@/app/(content)/submissions/[id]/(submission)/_utils/get-submission-by-id';
import AppLogo from '@/components/app-logo';
import SubmissionRequirementsForm from './_components/submission-requirements-form';

const SubmissionRequirementsPage = async ({ params }: { params: { id: string } }) => {
  const submission = await getSubmissionById(params.id);

  if (submission.status !== 'paid') {
    return redirect(`/submissions/${params.id}`);
  }

  if (!submission.trainers_details?.profile_name) {
    throw new Error('Trainer profile name is missing');
  }

  return (
    <div className="flex w-full max-w-[500px] flex-col gap-8 self-center">
      <div className="relative flex justify-center lg:hidden">
        <MobileNavbarLink aria-label="Zgłoszenia" className="absolute left-0" href="/submissions" icon="back" />
        <AppLogo />
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-white">Szczegóły zamówienia</h1>
        <span className="text-base text-white">
          <span>Trener: </span>
          <span className="font-bold text-yellow-400">{submission.trainers_details.profile_name}</span>
        </span>
      </div>
      <SubmissionRequirementsForm />
    </div>
  );
};

export default SubmissionRequirementsPage;
