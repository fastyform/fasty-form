import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import ReportsForm from '@/app/(content)/settings/(setting-pages)/payments/@dashboard/(dashboard-pages)/reports/reports-form';
import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserFromSession from '@/utils/get-user-from-session';

dayjs.extend(utc);
// TODO: Add download link in email for report run succeeded add expiration time for download link
const DashboardReports = async () => {
  const stripe = getStripe();
  const user = await getUserFromSession();
  const trainerDetails = await getTrainerDetailsById(user.id);

  if (!trainerDetails.stripe_account_id) throw new Error('No stripe account id');

  // We use sample report type to retrieve available date time range
  const sampleReportType = await stripe.reporting.reportTypes.retrieve('balance_change_from_activity.itemized.3', {
    stripeAccount: trainerDetails.stripe_account_id,
  });

  const recentReportRun = trainerDetails.stripe_recent_report_id
    ? await stripe.reporting.reportRuns.retrieve(trainerDetails.stripe_recent_report_id)
    : null;

  const dataAvailableStart = dayjs.unix(sampleReportType.data_available_start);
  const isReportingAvailable = dayjs().utc().diff(dataAvailableStart, 'day') > 0;

  return (
    <div className="flex max-w-lg flex-col gap-10 text-white">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-2xl font-semibold">Wygeneruj raport</h2>
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

export default DashboardReports;
