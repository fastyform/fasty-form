import { createClient } from '@supabase/supabase-js';
import 'dayjs/locale/pl';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import getTrainerDetailsBySlug from '@/app/(content)/trainers/[id]/_utils/get-trainer-details-by-slug';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import Constants from '@/utils/constants';
import getUserWithNull from '@/utils/get-user-with-null';
import { Database } from '@/utils/supabase/supabase';
import BuyForm from './_components/buy-form/buy-form';
import checkIsTrainerProfileOwner from './_utils/check-is-trainer-profile-owner';

const TrainerPage = async ({ params }: { params: { id: string } }) => {
  const trainerDetails = await getTrainerDetailsBySlug(params.id);
  const user = await getUserWithNull();
  const isUserOwner = await checkIsTrainerProfileOwner(user, trainerDetails.user_id);
  const stripeOnboardingRedirect = !trainerDetails.is_onboarded_stripe && !isUserOwner;
  const isTrainerAccount = user ? await checkIsTrainerAccount(user.id) : false;
  if (!trainerDetails.is_onboarded || stripeOnboardingRedirect) return notFound();

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
        <BuyForm isTrainerAccount={isTrainerAccount} trainerProfileSlug={params.id} />
      </div>
    </div>
  );
};

export default TrainerPage;

export async function generateStaticParams() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const { data: trainers, error } = await supabase
    .from('trainers_details')
    .select('profile_slug')
    .eq('is_onboarded', true);

  if (!trainers || error) return [];

  return trainers.map((trainer) => ({ id: trainer.profile_slug }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const { data: trainer, error } = await supabase
    .from('trainers_details')
    .select('profile_name')
    .eq('user_id', params.id)
    .single();

  if (!trainer || error || !trainer.profile_name)
    return {
      title: `Profil Trenera - ${Constants.APP_NAME}`,
      description: `Zakup analizę wideo u trenera w ${Constants.APP_NAME}.`,
    };

  return {
    title: `Profil Trenera ${trainer.profile_name} - ${Constants.APP_NAME}`,
    description: `Zakup analizę wideo u trenera ${trainer.profile_name} w ${Constants.APP_NAME}.`,
  };
}
