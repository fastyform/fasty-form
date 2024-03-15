'use client';

import { ErrorRounded } from '@mui/icons-material';
import { CircularProgress, IconButton } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import type Stripe from 'stripe';
import { twJoin } from 'tailwind-merge';
import { ReportType, reportTypeToLabel } from '@/app/(content)/settings/(setting-pages)/payments/utils';
import DownloadIcon from '@/assets/download-icon';
import AppTooltip from '@/components/app-tooltip';
import Constants, { DATE_FORMAT } from '@/utils/constants';
import { ensureNotNull } from '@/utils/index';
import notify from '@/utils/notify';
import actionGenerateFileLink from './action-generate-file-link';

const ReportRunIconSucceeded = ({ fileId }: { fileId: string }) => {
  const generateFileLinkMutation = useMutation({
    mutationFn: () => actionGenerateFileLink({ fileId }),
    onSuccess: (data) => {
      const link: HTMLAnchorElement = document.createElement('a');
      link.href = data;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    onError: () => {
      notify.error(Constants.COMMON_ERROR_MESSAGE);
    },
  });

  return (
    <IconButton
      classes={{ disabled: 'opacity-50' }}
      className="w-fit p-3 text-white sm:p-2"
      disabled={generateFileLinkMutation.isPending}
      onClick={() => generateFileLinkMutation.mutate()}
    >
      <DownloadIcon />
    </IconButton>
  );
};

const ReportRunIcon = ({ reportRun }: { reportRun: Stripe.Reporting.ReportRun }) => {
  if (reportRun.status === 'succeeded') {
    return <ReportRunIconSucceeded fileId={ensureNotNull(reportRun.result).id} />;
  }

  if (reportRun.status === 'pending') {
    return <CircularProgress classes={{ root: 'text-yellow-400 min-w-[24px] p-1 box-content' }} size={24} />;
  }

  if (reportRun.status === 'failed') {
    return <ErrorRounded className="box-content p-1 text-red-400" />;
  }
};

const createDateRange = ({ parameters, report_type }: Stripe.Reporting.ReportRun) => {
  if (report_type === 'connected_account_ending_balance_reconciliation.itemized.2') {
    return dayjs.unix(parameters.interval_end as number).format(DATE_FORMAT);
  }

  return `${dayjs.unix(parameters.interval_start as number).format(DATE_FORMAT)} - ${dayjs
    .unix(parameters.interval_end as number)
    .format(DATE_FORMAT)}`;
};

interface ReportRunProps {
  reportRun: Stripe.Reporting.ReportRun;
}

const ReportRun = ({ reportRun }: ReportRunProps) => {
  const { report_type, id, status } = reportRun;
  const isError = status === 'failed';

  return (
    <AppTooltip
      key={id}
      title={
        isError
          ? 'Wystąpił nieoczekiwany błąd podczas generowania raportu. Spróbuj ponownie lub skontaktuj się z nami.'
          : undefined
      }
    >
      <div
        className={twJoin(
          'flex items-center gap-2 rounded-xl border border-gray-600 bg-shark px-4 py-2 sm:grid-cols-[2fr_1fr_40px]',
          isError && 'opacity-50',
        )}
      >
        <div className="flex grow flex-col gap-2 sm:flex-row">
          <span className="grow basis-3/5 text-sm font-medium">{reportTypeToLabel[report_type as ReportType]}</span>
          <span className="order-last grow basis-2/5 text-sm">{createDateRange(reportRun)}</span>
        </div>
        <ReportRunIcon reportRun={reportRun} />
      </div>
    </AppTooltip>
  );
};

export default ReportRun;
