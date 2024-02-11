import { createClient } from '@supabase/supabase-js';
import 'dayjs/locale/pl';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { groszToPLN } from '@/app/(stripe)/stripe/_utils';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import Constants from '@/utils/constants';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';
import { Database } from '@/utils/supabase/supabase';
import BuyForm from './_components/buy-form/buy-form';
import checkIsTrainerProfileOwner from './_utils/check-is-trainer-profile-owner';
import getTrainerIdBySlug from './_utils/get-trainer-id-by-slug';

const TrainerPage = async ({ params }: { params: { slug: string } }) => {
  const trainerId = (await getTrainerIdBySlug(params.slug)).user_id;
  const [trainerDetails, user] = await Promise.all([getTrainerDetailsById(trainerId), getUserWithNull()]);
  const isUserOwner = await checkIsTrainerProfileOwner(user, trainerId);
  const stripeOnboardingRedirect = trainerDetails.stripe_onboarding_status !== 'verified' && !isUserOwner;
  const isTrainerAccount = user ? await checkIsTrainerAccount(user.id) : false;
  if (!trainerDetails.is_onboarded || stripeOnboardingRedirect) return notFound();
  if (!trainerDetails.service_price_in_grosz) throw new Error('Trainer has no service price set');

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
            Analiza techniki jednego wideo -{' '}
            <span className="font-bold">{groszToPLN(trainerDetails.service_price_in_grosz)} zł</span>
          </span>
        </div>
        <BuyForm isTrainerAccount={isTrainerAccount} trainerId={trainerId} />
      </div>
    </div>
  );
};

export default TrainerPage;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const { data: trainer, error } = await supabase
    .from('trainers_details')
    .select('profile_name')
    .eq('profile_slug', params.slug)
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
