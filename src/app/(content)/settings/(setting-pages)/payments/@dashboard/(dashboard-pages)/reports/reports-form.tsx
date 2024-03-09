'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { twJoin } from 'tailwind-merge';
import { z } from 'zod';
import {
  ALLOWED_REPORT_TYPES,
  ReportType,
  reportTypeToLabel,
} from '@/app/(content)/settings/(setting-pages)/payments/utils';
import AppButton from '@/components/app-button';
import AppDatePicker from '@/components/app-date-picker';
import AppInput from '@/components/app-input/app-input';
import Constants from '@/utils/constants';
import notify from '@/utils/notify';
import actionGenerateReport from './action-generate-report';

interface PaymentReportFormProps {
  dataAvailableStart: number;
  dataAvailableEnd: number;
  stripeAccountId: string;
}

const zodDay = z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date');

const formSchema = z
  .object({
    startDate: zodDay,
    endDate: zodDay,
  })
  .refine((data) => data.startDate.isBefore(data.endDate, 'day'), {
    message: 'Data początkowa musi być wcześniejsza niż data końcowa',
    path: ['startDate'],
  });

const ReportsForm = ({ dataAvailableStart, dataAvailableEnd, stripeAccountId }: PaymentReportFormProps) => {
  const [reportType, setReportType] = useState<ReportType>('connected_account_balance_change_from_activity.itemized.3');

  const reportDataStart = dayjs.unix(dataAvailableStart).utc();
  const reportDataEnd = dayjs.unix(dataAvailableEnd).utc();
  const firstDayOfCurrentMonthDate = dayjs().utc().startOf('month');

  const form = useForm({
    defaultValues: {
      startDate:
        firstDayOfCurrentMonthDate.unix() < reportDataStart.unix() ? reportDataStart : firstDayOfCurrentMonthDate,
      endDate: reportDataEnd,
    },
    resolver: zodResolver(formSchema),
  });

  const generateReportMutation = useMutation({
    mutationFn: () => {
      const { startDate, endDate } = form.getValues();

      return actionGenerateReport({
        interval_start: startDate.unix(),
        interval_end: endDate.unix(),
        report_type: reportType,
        stripeAccountId,
      });
    },
    onSuccess: () => {
      notify.success('Rozpoczęto generowanie raportu');
    },
    onError: () => {
      notify.error(Constants.COMMON_ERROR_MESSAGE);
    },
  });

  return (
    <div className="flex max-w-lg flex-col gap-6">
      <AppInput
        select
        label="Raport"
        value={reportType}
        SelectProps={{
          MenuProps: {
            classes: { paper: 'bg-shark bg-none rounded-xl' },
          },
        }}
        onChange={(event) => setReportType(event.target.value as ReportType)}
      >
        {ALLOWED_REPORT_TYPES.map((type) => (
          <MenuItem key={type} color="inherit" value={type}>
            {reportTypeToLabel[type]}
          </MenuItem>
        ))}
      </AppInput>
      <div className="grid gap-4 sm:grid-cols-2 ">
        <Controller
          control={form.control}
          name="startDate"
          render={({ field, fieldState }) => (
            <AppDatePicker
              disableFuture
              label="Data początkowa"
              minDate={reportDataStart}
              name={field.name}
              value={field.value}
              slotProps={{
                textField: {
                  error: fieldState.invalid,
                  helperText: fieldState.error?.message,
                  className: twJoin(
                    fieldState.invalid && '[&_.MuiInputAdornment-root_.MuiButtonBase-root]:text-red-400',
                  ),
                },
              }}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
        <Controller
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <AppDatePicker
              disableFuture
              label="Data końcowa"
              maxDate={reportDataEnd}
              minDate={reportDataStart}
              name={field.name}
              value={field.value}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
      </div>
      <AppButton
        classes={{ root: 'py-2.5 self-start' }}
        loading={generateReportMutation.isPending}
        onClick={form.handleSubmit(() => generateReportMutation.mutate())}
      >
        Wygeneruj raport
      </AppButton>
    </div>
  );
};

export default ReportsForm;
