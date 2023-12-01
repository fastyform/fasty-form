import Link from 'next/link';
import EditIcon from '@/app/(content)/trainers/[id]/_assets/edit-icon';
import checkIsTrainerProfileOwner from '@/app/(content)/trainers/[id]/_utils/check-is-trainer-profile-owner';
import getUserWithNull from '@/utils/get-user-with-null';

const EditButtonMobile = async ({ trainerId }: { trainerId: string }) => {
  const user = await getUserWithNull();
  const isTrainerOwner = await checkIsTrainerProfileOwner(user, trainerId);
  // TODO REMOVE ARTIFICIAL TIMEOUT
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return (
    <>
      {isTrainerOwner && (
        <Link
          aria-label="Edycja profilu"
          className="flex h-11 w-11 min-w-0 items-center justify-center rounded-xl border border-solid border-gray-600 bg-[#1E2226]"
          href={`/trainers/${trainerId}/edit-profile`}
        >
          <EditIcon />
        </Link>
      )}
    </>
  );
};

export default EditButtonMobile;
