import { getSupabaseServerComponentClient } from '@/utils/supabase/client';
import SubmissionCard from './submission-card/submission-card';

const Submissions = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const supabase = getSupabaseServerComponentClient();

  let query = supabase.from('submissions').select('id, status, thumbnail_url, trainers_details (profile_name)');

  if (searchParams?.filter === 'reviewed') {
    query = query.eq('status', 'reviewed');
  }

  if (searchParams?.filter === 'unreviewed') {
    query = query.eq('status', 'unreviewed');
  }

  const { data: submissions, error } = await query;
  // TODO REMOVE ARTIFICIAL LOADING TIME
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  if (error)
    return (
      <h2 className="text-base text-white">
        Coś poszło nie tak przy pobieraniu twoich zgłoszeń. Spróbuj odświeżyć stronę lub skontaktuj się z nami.
      </h2>
    );

  if (!submissions?.length) return <h2 className="text-base text-white">Tutaj pojawią się twoje zgłoszenia.</h2>;

  return (
    <>
      {!!submissions &&
        submissions.map(({ id, trainers_details, status, thumbnail_url }) => {
          if (!trainers_details || !trainers_details.profile_name) return;

          return (
            <SubmissionCard
              key={id}
              submissionId={id}
              submissionStatus={status}
              thumbnailUrl={thumbnail_url}
              trainerProfileName={trainers_details.profile_name}
            />
          );
        })}
    </>
  );
};

export default Submissions;
