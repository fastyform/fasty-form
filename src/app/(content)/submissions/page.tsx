import getSupabase from '@/utils/supabase/get-supabase';
import FilterTabs from './_components/filter-tabs';
import OrdersCard from './_components/orders-card';

const SubmissionsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const supabase = getSupabase();

  let query = supabase.from('submissions').select('id, trainer_review, trainers_details (profile_name)');

  if (searchParams?.filter === 'reviewed') {
    query = query.not('trainer_review', 'is', null);
  }

  if (searchParams?.filter === 'unreviewed') {
    query = query.is('trainer_review', null);
  }

  const { data: submissions } = await query;

  return (
    <>
      <h1 className="text-2xl text-white">Twoje zgłoszenia</h1>
      <div className="flex flex-col gap-5">
        <FilterTabs defaultFilter={searchParams?.filter} />
        <div className="grid grid-cols-3 gap-4">
          {submissions &&
            submissions.map(({ id, trainers_details }) => (
              <OrdersCard key={id} submissionId={id} trainerProfileName={trainers_details?.profile_name} />
            ))}
        </div>
      </div>
    </>
  );
};

export default SubmissionsPage;
