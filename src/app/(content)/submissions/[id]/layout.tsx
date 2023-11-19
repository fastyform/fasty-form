import { ReactNode } from 'react';
import dayjs from 'dayjs';
import MobileNavbarLink from '@/app/(content)/_components/navbar/mobile-navbar/mobile-navbar-link';
import StatusBadge from '@/app/(content)/submissions/_components/status-badge';
import { getSupabaseServerComponentClient } from '@/utils/supabase/client';

const SubmissionLayout = async ({ children, params }: { children: ReactNode; params: { id: string } }) => {
  const supabase = getSupabaseServerComponentClient();

  const { data: submission, error } = await supabase
    .from('submissions')
    .select(
      'status, thumbnail_url, trainers_details (profile_name), updated_at, video_url, client_description, trainer_review',
    )
    .eq('id', params.id)
    .single();

  if (!submission || error) {
    return (
      <div className="flex flex-col gap-5">
        <MobileNavbarLink aria-label="Zgłoszenia" href="/submissions" icon="back" />
        <h2 className="text-base text-white">
          Coś poszło nie tak przy pobieraniu twoich zgłoszenia. Spróbuj odświeżyć stronę lub skontaktuj się z nami.
        </h2>
      </div>
    );
  }

  const formattedUpdateDate = dayjs(submission.updated_at).local().format('dddd HH:mm');

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-5">
          <MobileNavbarLink aria-label="Zgłoszenia" href="/submissions" icon="back" />
          <span className="hidden text-xl text-white lg:block">
            <span className="font-bold">Ostatnia zmiana: </span>
            <span className="capitalize">{formattedUpdateDate}</span>
          </span>
        </div>

        <div className="flex items-center gap-5">
          <span className="hidden text-xl text-white lg:block">
            <span>Trener: </span>
            <span className="font-bold text-yellow-400">{submission.trainers_details?.profile_name}</span>
          </span>
          <StatusBadge type={submission.status} />
        </div>
      </div>
      {children}
    </>
  );
};

export default SubmissionLayout;
