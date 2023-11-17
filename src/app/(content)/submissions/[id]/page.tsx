import { Typography } from '@mui/material';
import { createClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import dayjsUtc from 'dayjs/plugin/utc';
import getSupabase from '@/utils/supabase/get-supabase';
import 'dayjs/locale/pl';

dayjs.extend(dayjsUtc);
dayjs.locale('pl');

const SubmissionPage = async ({ params }: { params: { id: string } }) => {
  const supabaseWithCookies = getSupabase();
  const { data: submission } = await supabaseWithCookies
    .from('submissions')
    .select('status, thumbnail_url, trainers_details (profile_name), updated_at, video_url')
    .eq('id', params.id)
    .single();
  if (!submission) return;

  const formattedUpdateDate = dayjs(submission.updated_at).local().format('dddd HH:mm');

  return (
    <div className="flex flex-col gap-5">
      <Typography className=" text-base text-white">
        <span className="font-bold">Ostatnia zmiana: </span>
        <span className="capitalize">{formattedUpdateDate}</span>
      </Typography>
      <video
        controls
        muted
        className="h-40 rounded-xl border border-gray-600"
        poster={submission?.thumbnail_url || undefined}
        src={submission.video_url}
      />
    </div>
  );
};

export default SubmissionPage;

export async function generateStaticParams() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { data: submissions, error } = await supabase.from('submissions').select('id');

  if (!submissions || error) return;

  return submissions.map((submission) => ({
    id: submission.id,
  }));
}
