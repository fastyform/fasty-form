import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import ReportsForm from '@/app/(content)/settings/(setting-pages)/payments/@dashboard/(dashboard-pages)/reports/reports-form';
import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserFromSession from '@/utils/get-user-from-session';
import ReportRuns from './report-runs';

dayjs.extend(utc);

const DashboardReports = async () => {
  const stripe = getStripe();
  const user = await getUserFromSession();
  const trainerDetails = await getTrainerDetailsById(user.id);

  if (!trainerDetails.stripe_account_id) throw new Error('No stripe account id');

  const sampleReportTypePromise = stripe.reporting.reportTypes.retrieve('balance_change_from_activity.itemized.3', {
    stripeAccount: trainerDetails.stripe_account_id,
  });

  const reportRunsPromise = stripe.reporting.reportRuns.list(
    { limit: 5 },
    {
      stripeAccount: trainerDetails.stripe_account_id,
    },
  );

  
  const [sampleReportType, reportRuns] = await Promise.all([sampleReportTypePromise, reportRunsPromise]);
  console.log(reportRuns);

  const dataAvailableStart = dayjs.unix(sampleReportType.data_available_start);
  const areReportsAvailable = dayjs().utc().diff(dataAvailableStart, 'day') > 0;

  return (
    <div className="flex max-w-lg flex-col gap-10 text-white">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-2xl font-semibold">Wygeneruj raport</h2>
          <p>
            {areReportsAvailable
              ? 'Generuj raporty finansowe, aby kontrolować liczbę transakcji i wypłat.'
              : 'Generowanie raportów finansowych jest możliwe po upływie 24 godzin od podłączenia płatności.'}
          </p>
        </div>
        {areReportsAvailable && (
          <ReportsForm
            dataAvailableEnd={sampleReportType.data_available_end}
            dataAvailableStart={sampleReportType.data_available_start}
            stripeAccountId={trainerDetails.stripe_account_id}
          />
        )}
      </div>
      {areReportsAvailable && (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2.5">
            <h2 className="text-2xl font-semibold">Ostatnio wygenerowane raporty</h2>
            <p>
              {reportRuns.data.length > 0
                ? 'Powiadomimy Cię drogą mailową, kiedy raport będzie gotowy do pobrania.'
                : 'Tutaj pojawią się Twoje wygenerowane raporty. Kiedy tylko raport będzie gotowy, powiadomimy Cię drogą mailową.'}
            </p>
          </div>
          <ReportRuns reportRuns={reportRuns.data} stripeAccountId={trainerDetails.stripe_account_id} />
        </div>
      )}
    </div>
  );
};

export default DashboardReports;
