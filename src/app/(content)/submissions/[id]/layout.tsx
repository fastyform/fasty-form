import { ReactNode } from 'react';
import { Typography } from '@mui/material';
import MobileNavbarLink from '@/app/(content)/_components/navbar/mobile-navbar/mobile-navbar-link';
import StatusBadge from '@/app/(content)/submissions/_components/status-badge';
import getSupabase from '@/utils/supabase/get-supabase';

const SubmissionLayout = async ({ children, params }: { children: ReactNode; params: { id: string } }) => {
  const supabase = getSupabase();
  const { data: submission, error } = await supabase
    .from('submissions')
    .select('status, thumbnail_url, trainers_details (profile_name), updated_at')
    .eq('id', params.id)
    .single();

  if (!submission || error)
    return (
      <div className="flex flex-col gap-5">
        <MobileNavbarLink aria-label="Zgłoszenia" href="/submissions" icon="back" />
        <Typography className="text-base text-white" variant="h2">
          Coś poszło nie tak przy pobieraniu twoich zgłoszenia. Spróbuj odświeżyć stronę lub skontaktuj się z nami.
        </Typography>
      </div>
    );

  return (
    <>
      <div className="align-center flex w-full justify-between lg:hidden">
        <MobileNavbarLink aria-label="Zgłoszenia" href="/submissions" icon="back" />
        <StatusBadge type={submission.status} />
      </div>
      {children}
    </>
  );
};

export default SubmissionLayout;
