import Link from 'next/link';
import EditIcon from '@/app/(content)/trainers/[id]/_assets/edit-icon';
import { getUserIdFromSession } from '@/utils/get-data-from-session';
import { getSupabaseServerComponentClient } from '@/utils/supabase/client';

const EditButtonMobile = async ({ trainerId }: { trainerId: string }) => {
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
          aria-label="Edycja profilu"
          className="flex h-11 w-11 min-w-0 items-center justify-center rounded-xl border border-solid border-gray-600 bg-[#1E2226]"
          href="/submissions"
        >
          <EditIcon />
        </Link>
      )}
    </>
  );
};

export default EditButtonMobile;
