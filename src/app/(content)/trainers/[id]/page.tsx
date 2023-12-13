import { createClient } from '@supabase/supabase-js';
import 'dayjs/locale/pl';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';
import BuyForm from './_components/buy-form/buy-form';
import checkIsTrainerProfileOwner from './_utils/check-is-trainer-profile-owner';

const TrainerPage = async ({ params }: { params: { id: string } }) => {
  const trainerDetails = await getTrainerDetailsById(params.id);
  const user = await getUserWithNull();
  const isUserOwner = await checkIsTrainerProfileOwner(user, params.id);
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
        <BuyForm isTrainerAccount={isTrainerAccount} trainerId={params.id} />
      </div>
    </div>
  );
};

export default TrainerPage;

export async function generateStaticParams() {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
  const { data: trainers, error } = await supabase
    .from('trainers_details')
    .select('user_id')
    .eq('is_onboarded', true)
    .eq('is_onboarded_stripe', true);

  if (!trainers || error) return [];

  return trainers.map((trainer) => ({ id: trainer.user_id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
  const { data: trainer, error } = await supabase
    .from('trainers_details')
    .select('profile_name')
    .eq('user_id', params.id)
    .single();

  if (!trainer || error)
    return {
      title: 'Profil Trenera - FastyForm',
      description: 'Zakup analizę wideo u trenera w FastyForm.',
    };

  return {
    title: `Profil Trenera ${trainer.profile_name} - FastyForm`,
    description: `Zakup analizę wideo u trenera ${trainer.profile_name} w FastyForm.`,
  };
}
