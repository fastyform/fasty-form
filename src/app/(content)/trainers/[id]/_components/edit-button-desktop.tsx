import Link from 'next/link';
import EditIcon from '@/app/(content)/trainers/[id]/_assets/edit-icon';
import { getUserIdFromSession } from '@/utils/get-data-from-session';
import { getSupabaseServerComponentClient } from '@/utils/supabase/client';

const EditButtonDesktop = async ({ trainerId }: { trainerId: string }) => {
  const userId = (await getUserIdFromSession()) || '';
  const supabase = getSupabaseServerComponentClient();
  const { data: trainerDetails } = await supabase
    .from('trainers_details')
    .select('profile_name, profile_image_url, isOnboarded, service_price, user_id')
    .eq('id', trainerId)
    .single();
  if (!trainerDetails) return;

  const isTrainerTheOwner = trainerDetails.user_id === userId;

  // TODO REMOVE ARTIFICIAL TIMEOUT
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return (
    <>
      {isTrainerTheOwner && (
        <Link
          className="absolute left-0 top-0 hidden w-fit min-w-0 gap-2.5 rounded-xl border border-solid border-gray-600 bg-[#1E2226] px-5 py-2.5 text-sm font-normal text-white transition-opacity hover:opacity-80 lg:flex"
          href="/submissions"
        >
          <EditIcon />
          Kliknij, aby edytować stronę profilu
        </Link>
      )}
    </>
  );
};

export default EditButtonDesktop;
