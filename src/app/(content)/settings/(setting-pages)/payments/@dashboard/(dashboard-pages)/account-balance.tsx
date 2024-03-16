import { groszToPLN } from '@/app/(stripe)/stripe/_utils';
import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserFromSession from '@/utils/get-user-from-session';

const AccountBalance = async () => {
  const stripe = getStripe();
  const user = await getUserFromSession();

  const trainerDetails = await getTrainerDetailsById(user.id);

  if (!trainerDetails.stripe_account_id) throw new Error();

  const balance = await stripe.balance.retrieve({ stripeAccount: trainerDetails.stripe_account_id });

  const [available] = balance.available;
  const [pending] = balance.pending;

  return (
    <div className="flex gap-6 sm:gap-8 md:gap-10">
      <div className="flex flex-col gap-2 text-white">
        <span>Wkrótce dostępne</span>
        <span className="text-2xl font-bold min-[440px]:text-4xl md:text-6xl md:font-semibold">
          {groszToPLN(pending.amount).toFixed(2)} zł
        </span>
      </div>
      <div className="border border-white" />
      <div className="flex flex-col gap-2 text-yellow-400">
        <span>W drodze do banku</span>
        <span className="text-2xl font-bold min-[440px]:text-4xl md:text-6xl md:font-semibold ">
          {groszToPLN(available.amount).toFixed(2)} zł
        </span>
      </div>
    </div>
  );
};

export default AccountBalance;
