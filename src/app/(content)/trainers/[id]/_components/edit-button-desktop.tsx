import Link from 'next/link';
import EditIcon from '@/app/(content)/trainers/[id]/_assets/edit-icon';
import checkIsTrainerProfileOwner from '@/app/(content)/trainers/[id]/_utils/check-is-trainer-profile-owner';

const EditButtonDesktop = async ({ trainerId }: { trainerId: string }) => {
  const isTrainerOwner = await checkIsTrainerProfileOwner(trainerId);

  // TODO REMOVE ARTIFICIAL TIMEOUT
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return (
    <>
      {isTrainerOwner && (
        <Link
          className="absolute left-0 top-0 hidden w-fit min-w-0 gap-2.5 rounded-xl border border-solid border-gray-600 bg-[#1E2226] px-5 py-2.5 text-sm font-normal text-white transition-opacity hover:opacity-80 lg:flex"
          href={`/trainers/${trainerId}/edit-profile`}
        >
          <EditIcon />
          Kliknij, aby edytować stronę profilu
        </Link>
      )}
    </>
  );
};

export default EditButtonDesktop;
