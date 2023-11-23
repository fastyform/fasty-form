import { createClient } from '@supabase/supabase-js';
import 'dayjs/locale/pl';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import AppButtonLink from '@/components/app-button-link';
import getTrainerDetailsById from './_utils/get-trainer-details-by-id';

const TrainerPage = async ({ params }: { params: { id: string } }) => {
  const trainerDetails = await getTrainerDetailsById(params.id);

  if (!trainerDetails.is_onboarded) return redirect('/submissions');

  // TODO REMOVE ARTIFICIAL TIMEOUT
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return (
    <div className="flex grow flex-col items-center justify-between gap-10 lg:justify-start">
      <div className="relative mb-auto mt-auto aspect-square w-full max-w-sm rounded-full border border-gray-600 object-cover lg:mb-0 lg:mt-0">
        <Image
          fill
          alt={`${trainerDetails.profile_name} profile image`}
          className="rounded-full"
          src={trainerDetails.profile_image_url || '/default-trainer.jpg'}
        />
      </div>

      <div className="flex w-full flex-col items-center gap-10">
        <div className="flex flex-col items-center sm:gap-2.5">
          <h1 className="text-2xl font-bold text-white sm:text-4xl md:text-6xl ">{trainerDetails.profile_name}</h1>
          <span className="text-base text-white lg:text-xl">
            Analiza techniki jednego wideo - <span className="font-bold">{trainerDetails.service_price}zł </span>
          </span>
        </div>
        <AppButtonLink className="w-full max-w-sm" href="/">
          Kup analizę techniki
        </AppButtonLink>
      </div>
    </div>
  );
};

export default TrainerPage;

export async function generateStaticParams() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { data: trainers, error } = await supabase.from('trainers_details').select('user_id');
  if (!trainers || error) return;

  return trainers.map((trainer) => ({
    id: trainer.user_id,
  }));
}
