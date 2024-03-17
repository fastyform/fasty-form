import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserFromSession from '@/utils/get-user-from-session';
import AccountBalance from './account-balance';
import ReportsForm from './reports-form';

dayjs.extend(utc);

const PaymentsVerified = async () => {
  const stripe = getStripe();
  const user = await getUserFromSession();
  const trainerDetails = await getTrainerDetailsById(user.id);

  if (!trainerDetails.stripe_account_id) throw new Error('No stripe account id');

  // We use sample report type to retrieve available date time range
  const sampleReportType = await stripe.reporting.reportTypes.retrieve('balance_change_from_activity.itemized.3', {
    stripeAccount: trainerDetails.stripe_account_id,
  });

  const dataAvailableStart = dayjs.unix(sampleReportType.data_available_start);
  const isReportingAvailable = dayjs().utc().diff(dataAvailableStart, 'day') > 0;

  return (
    <div className="my-5 grid grow grid-cols-1 gap-12 text-white md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <div className="flex max-w-lg flex-col gap-2.5">
          <h2 className="text-2xl font-semibold">Twoje saldo</h2>
          <p>
            Wypłata na konto bankowe trafia zazwyczaj w 3 do 7 dni roboczych po zakończonej i ocenionej przez Ciebie
            analizie wideo.
          </p>
        </div>
        <AccountBalance />
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-2xl font-semibold">Raport finansowy</h2>
          <p>
            {isReportingAvailable
              ? 'Generuj raporty finansowe, aby kontrolować liczbę transakcji i wypłat.'
              : 'Generowanie raportów finansowych jest możliwe po upływie 24 godzin od podłączenia płatności.'}
          </p>
        </div>
        {isReportingAvailable && (
          <ReportsForm
            dataAvailableEnd={sampleReportType.data_available_end}
            dataAvailableStart={sampleReportType.data_available_start}
            stripeAccountId={trainerDetails.stripe_account_id}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentsVerified;
