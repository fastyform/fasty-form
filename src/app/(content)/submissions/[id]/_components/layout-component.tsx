import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import MobileNavbarLink from '@/app/(content)/_components/navbar/mobile-navbar/mobile-navbar-link';
import StatusBadge from '@/app/(content)/submissions/_components/status-badge';
import { getSupabaseServerComponentClient } from '@/utils/supabase/client';

const LayoutComponent = async ({ submissionId }: { submissionId: string }) => {
  const supabase = getSupabaseServerComponentClient();

  const { data: submission, error } = await supabase
    .from('submissions')
    .select(
      'status, thumbnail_url, trainers_details (profile_name), updated_at, video_url, client_description, trainer_review',
    )
    .eq('id', submissionId)
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
  // TODO REMOVE ARTIFICIAL TIMEOUT
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });

  return (
    <>
      <div className="flex items-center gap-5">
        <MobileNavbarLink aria-label="Zgłoszenia" href="/submissions" icon="back" />
        <Typography className="hidden text-xl text-white lg:block">
          <span className="font-bold">Ostatnia zmiana: </span>
          <span className="capitalize">{formattedUpdateDate}</span>
        </Typography>
      </div>

      <div className="flex items-center gap-5">
        <Typography className="hidden text-xl text-white lg:block">
          <span>Trener: </span>
          <span className="font-bold text-yellow-400">{submission.trainers_details?.profile_name}</span>
        </Typography>
        <StatusBadge type={submission.status} />
      </div>
    </>
  );
};

export default LayoutComponent;
