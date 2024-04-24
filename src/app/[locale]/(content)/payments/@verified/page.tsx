import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { getTranslations } from 'next-intl/server';
import getLoggedInUser from '@/utils/get-logged-in-user';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getStripe from '@/utils/stripe/get-stripe';
import AccountBalance from './account-balance';
import ReportsForm from './reports-form';

dayjs.extend(utc);

const PaymentsVerified = async () => {
  const t = await getTranslations();
  const stripe = getStripe();
  const user = await getLoggedInUser();
  const trainerDetails = await getTrainerDetailsById(user.id);

  if (!trainerDetails.stripe_account_id) throw new Error('No stripe account id');

  // We use sample report type to retrieve available date time range
  const sampleReportType = await stripe.reporting.reportTypes.retrieve('balance_change_from_activity.itemized.3', {
    stripeAccount: trainerDetails.stripe_account_id,
  });

  const dataAvailableStart = dayjs.unix(sampleReportType.data_available_start);
  const isReportingAvailable = dayjs().utc().diff(dataAvailableStart, 'day') > 0;

  return (
    <div className="grid grow grid-cols-1 gap-12 text-white md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <div className="flex max-w-lg flex-col gap-2.5">
          <h2 className="text-2xl font-semibold">{t('PAYMENTS_BALANCE_YOURS')}</h2>
          <p>{t('PAYMENTS_BALANCE_DESCRIPTION')}</p>
        </div>
        <AccountBalance />
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-2xl font-semibold">{t('REPORT_TITLE')}</h2>
          <p>{t(isReportingAvailable ? 'REPORT_DESCRIPTION_AVAILABLE' : 'REPORT_DESCRIPTION_NOT_AVAILABLE')}</p>
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
