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
    <div className="flex grow items-end min-[800px]:items-center">
      <div className="fixed right-0 top-0 z-0 aspect-[1/2] h-full max-w-full">
        <div className="relative left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#0D1116] to-transparent" />
        {trainerDetails.profile_image_url ? (
          <Image
            fill
            alt={`${trainerDetails.profile_name} profile image`}
            className=" object-contain"
            src={trainerDetails.profile_image_url}
          />
        ) : (
          <div className="bg-custom-radial fixed left-0 top-0 z-30 h-screen w-screen" />
        )}
        <div className="d fixed bottom-0 left-0 z-10 h-96 w-full bg-gradient-to-t from-[#0D1116] to-transparent" />
      </div>
      <div className="relative z-20 flex w-full max-w-sm flex-col gap-10 lg:max-w-2xl xl:max-w-4xl">
        <div className="flex flex-col min-[800px]:gap-2.5">
          <h1 className="text-2xl font-bold text-white min-[800px]:text-6xl xl:text-8xl">
            {trainerDetails.profile_name}
          </h1>
          <span className="text-base text-white lg:text-xl">
            Analiza techniki jednego wideo - <span className="font-bold">{trainerDetails.service_price}zł </span>
          </span>
        </div>
        <AppButtonLink className="max-w-sm" href="/">
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
