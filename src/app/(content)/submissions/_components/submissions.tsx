import { ReactNode } from 'react';
import NotFoundIcon from '@/app/(content)/submissions/_assets/not-found-icon';
import { getSupabaseServerComponentClient } from '@/utils/supabase/client';
import { SearchParams } from '@/utils/types';
import SubmissionCard from './submission-card/submission-card';

export const SubmissionsGridWrapper = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 gap-5 min-[450px]:grid-cols-2 md:grid-cols-3 md:gap-10 xl:grid-cols-4">
    {children}
  </div>
);

const ALLOWED_FILTERS = ['paid', 'reviewed', 'unreviewed', 'paidout'];

const Submissions = async ({
  searchParams,
  isTrainerAccount,
}: {
  searchParams: SearchParams;
  isTrainerAccount: boolean;
}) => {
  const supabase = getSupabaseServerComponentClient();

  let query = supabase
    .from('submissions')
    .select('id, status, thumbnail_url, trainers_details (profile_name)')
    .order('created_at', { ascending: false });

  if (isTrainerAccount) {
    query = query.neq('status', 'paid');
  }

  if (typeof searchParams.filter === 'string' && ALLOWED_FILTERS.includes(searchParams.filter)) {
    const status =
      !isTrainerAccount && searchParams.filter === 'reviewed' ? '("reviewed","paidout")' : `(${searchParams.filter})`;

    query = query.filter('status', 'in', status);
  }

  const { data: submissions, error } = await query;

  if (error)
    return (
      <h2 className="text-base text-white">
        Napotkaliśmy problem przy pobieraniu twoich zgłoszeń. Spróbuj odświeżyć stronę lub, jeśli to nie pomoże,
        skontaktuj się z nami.
      </h2>
    );

  if (!submissions?.length)
    return (
      <div className="flex w-full flex-col items-center gap-5 ">
        <div className="max-h-sm flex aspect-square h-auto w-full max-w-sm items-center justify-center rounded-full border border-gray-600 bg-[#1C1F22] min-[300px]:w-2/3">
          <NotFoundIcon className="w-full" />
        </div>
        <div className="flex max-w-sm flex-col justify-center gap-2.5 text-center text-white">
          <h2 className="text-xl font-bold md:text-2xl">Nic tu jeszcze nie ma!</h2>
          <p>
            {isTrainerAccount
              ? 'Twoje zgłoszenia pojawią się tutaj, gdy klient zakupi usługę oraz wypełni wszystkie potrzebne informacje.'
              : 'Twoje zgłoszenia pojawią się tutaj, gdy je utworzysz!'}
          </p>
        </div>
      </div>
    );

  return (
    <SubmissionsGridWrapper>
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
    </SubmissionsGridWrapper>
  );
};

export default Submissions;
