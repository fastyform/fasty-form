import { createClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import dayjsUtc from 'dayjs/plugin/utc';
import 'dayjs/locale/pl';
import getUserRoleFromSession from '@/utils/get-user-role-from-session';
import { getSupabaseServerComponentClient } from '@/utils/supabase/client';
import SubmissionPartWithIcon from './_components/submission-part-with-icon';
import AddTrainerReviewForm from './_components/trainer-review-form/add-trainer-review-form';

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

  // TODO REMOVE ARTIFICIAL TIMEOUT
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:gap-10 xl:gap-40">
      <p className=" text-base text-white lg:hidden">
        <span className="font-bold">Ostatnia zmiana: </span>
        <span className="capitalize">{formattedUpdateDate}</span>
      </p>
      <video
        controls
        muted
        className="aspect-video  rounded-xl border border-gray-600 lg:order-2 lg:h-80 xl:h-96"
        poster={submission?.thumbnail_url || undefined}
        src={submission.video_url}
      />
      <div className="flex flex-col gap-5 lg:order-1 lg:grow">
        <SubmissionPartWithIcon verticalLine icon="submission">
          <h2 className="text-lg font-bold leading-5 text-white">
            {isTrainerAccount ? 'Zgłoszenie klienta' : 'Twoje zgłoszenie'}
          </h2>
          <p className="whitespace-pre-wrap text-sm text-white">{submission.client_description}</p>
        </SubmissionPartWithIcon>

        {submission.status === 'reviewed' && (
          <>
            <SubmissionPartWithIcon verticalLine icon="description">
              <h2 className="text-lg font-bold leading-5 text-white">
                {isTrainerAccount ? 'Twoja odpowiedź' : 'Odpowiedź trenera'}
              </h2>
              <p className="whitespace-pre-wrap text-sm text-white">{submission.trainer_review}</p>
            </SubmissionPartWithIcon>
            <SubmissionPartWithIcon icon="finished">
              <p className="text-lg font-bold text-yellow-400">Zamówienie zakończone</p>
              <p className="whitespace-pre-wrap text-sm text-white">
                Data wykonania <span className="font-bold capitalize">{formattedFinishDate}</span>
              </p>
            </SubmissionPartWithIcon>
          </>
        )}

        {submission.status === 'unreviewed' &&
          (isTrainerAccount ? (
            <AddTrainerReviewForm submissionId={params.id} />
          ) : (
            <SubmissionPartWithIcon containerStyles="opacity-50" icon="submission">
              <h2 className="text-lg font-bold leading-5 text-white">Oczekiwanie na odpowiedź trenera...</h2>
              <p className="text-sm text-white">
                Po ocenie twojego filmiku przez trenera, w tym miejscu pojawi się jego odpowiedź.
              </p>
            </SubmissionPartWithIcon>
          ))}
      </div>
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
