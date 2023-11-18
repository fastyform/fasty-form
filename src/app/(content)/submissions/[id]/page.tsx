import { Typography } from '@mui/material';
import { createClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import dayjsUtc from 'dayjs/plugin/utc';
import 'dayjs/locale/pl';
import getUserRoleFromSession from '@/utils/get-user-role-from-session';
import { getSupabaseServerComponentClient } from '@/utils/supabase/client';
import SubmissionPartWithIcon from './_components/submission-part-with-icon';
import TrainerDescriptionUnreviewed from './_components/trainer-review-form/trainer-review-form';

dayjs.extend(dayjsUtc);
dayjs.locale('pl');

const SubmissionPage = async ({ params }: { params: { id: string } }) => {
  const isTrainerAccount = (await getUserRoleFromSession()) === 'trainer';
  const supabaseWithCookies = getSupabaseServerComponentClient();
  const { data: submission } = await supabaseWithCookies
    .from('submissions')
    .select(
      'status, thumbnail_url, trainers_details (profile_name), updated_at, video_url, client_description, trainer_review',
    )
    .eq('id', params.id)
    .single();
  if (!submission) return;

  const formattedUpdateDate = dayjs(submission.updated_at).local().format('dddd HH:mm');
  const formattedFinishDate = dayjs(submission.updated_at).local().format('D MMMM');

  return (
    <div className="flex flex-col gap-5">
      <Typography className=" text-base text-white">
        <span className="font-bold">Ostatnia zmiana: </span>
        <span className="capitalize">{formattedUpdateDate}</span>
      </Typography>
      <video
        controls
        muted
        className="h-48 rounded-xl border border-gray-600"
        poster={submission?.thumbnail_url || undefined}
        src={submission.video_url}
      />
      <SubmissionPartWithIcon verticalLine icon="submission">
        <Typography className="text-lg font-bold leading-5 text-white" variant="h2">
          {isTrainerAccount ? 'Zgłoszenie klienta' : 'Twoje zgłoszenie'}
        </Typography>
        <Typography className="whitespace-pre-wrap text-sm text-white">{submission.client_description}</Typography>
      </SubmissionPartWithIcon>

      {submission.status === 'reviewed' && (
        <>
          <SubmissionPartWithIcon verticalLine icon="description">
            <Typography className="text-lg font-bold leading-5 text-white" variant="h2">
              {isTrainerAccount ? 'Twoja odpowiedź' : 'Odpowiedź trenera'}
            </Typography>
            <Typography className="whitespace-pre-wrap text-sm text-white">{submission.trainer_review}</Typography>
          </SubmissionPartWithIcon>
          <SubmissionPartWithIcon icon="finished">
            <Typography className="text-lg font-bold text-yellow-400">Zamówienie zakończone</Typography>
            <Typography className="whitespace-pre-wrap text-sm text-white">
              Data wykonania <span className="font-bold capitalize">{formattedFinishDate}</span>
            </Typography>
          </SubmissionPartWithIcon>
        </>
      )}

      {submission.status === 'unreviewed' &&
        (isTrainerAccount ? (
          <TrainerDescriptionUnreviewed submissionId={params.id} />
        ) : (
          <SubmissionPartWithIcon containerStyles="opacity-50" icon="submission">
            <Typography className="text-lg font-bold leading-5 text-white" variant="h2">
              Oczekiwanie na odpowiedź trenera...
            </Typography>
            <Typography className="text-sm text-white">
              Po ocenie twojego filmiku przez trenera, w tym miejscu pojawi się jego odpowiedź.
            </Typography>
          </SubmissionPartWithIcon>
        ))}
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
