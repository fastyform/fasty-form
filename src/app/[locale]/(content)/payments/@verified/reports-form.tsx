'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { useTranslations } from 'next-intl';
import { twJoin } from 'tailwind-merge';
import { z } from 'zod';
import { ALLOWED_REPORT_TYPES, ReportType, reportTypeToLabel } from '@/app/[locale]/(content)/payments/utils';
import AppButtonNew from '@/components/app-button-new';
import AppDatePicker from '@/components/app-date-picker';
import AppInput from '@/components/app-input/app-input';
import notify from '@/utils/notify';
import { IntlShape } from '@/utils/types';
import actionGenerateReport from './action-generate-report';

interface PaymentReportFormProps {
  dataAvailableStart: number;
  dataAvailableEnd: number;
  stripeAccountId: string;
}

const zodDay = z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date');

const getFormSchema = (t: IntlShape) =>
  z
    .object({
      startDate: zodDay,
      endDate: zodDay,
    })
    .refine((data) => data.startDate.isBefore(data.endDate, 'day'), {
      message: t('REPORT_DATE_SELECT_INVALID'),
      path: ['startDate'],
    });

type FormValues = z.infer<ReturnType<typeof getFormSchema>>;

const ReportsForm = ({ dataAvailableStart, dataAvailableEnd, stripeAccountId }: PaymentReportFormProps) => {
  const t = useTranslations();
  const [reportType, setReportType] = useState<ReportType>('connected_account_balance_change_from_activity.itemized.3');

  const reportDataStart = dayjs.unix(dataAvailableStart).utc();
  const reportDataEnd = dayjs.unix(dataAvailableEnd).utc();
  const firstDayOfCurrentMonthDate = dayjs().utc().startOf('month');

  const isStartDateSkipped = reportType === 'connected_account_ending_balance_reconciliation.itemized.2';

  const form = useForm({
    defaultValues: {
      startDate:
        firstDayOfCurrentMonthDate.unix() < reportDataStart.unix() ? reportDataStart : firstDayOfCurrentMonthDate,
      endDate: reportDataEnd,
    },
    resolver: zodResolver(getFormSchema(t)),
  });

  const generateReportMutation = useMutation({
    mutationFn: ({ startDate, endDate }: FormValues) =>
      actionGenerateReport({
        interval_start: isStartDateSkipped ? undefined : startDate.unix(),
        interval_end: endDate.unix(),
        report_type: reportType,
        stripeAccountId,
      }),
    onSuccess: () => {
      notify.success(t('REPORT_SUCCESS_TOAST'));
    },
    onError: () => {
      notify.error(t('COMMON_ERROR'));
    },
  });

  return (
    <div className="flex max-w-lg flex-col gap-6">
      <AppInput
        select
        label={t('REPORT_TYPE_SELECT_LABEL')}
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
            {t(reportTypeToLabel[type])}
          </MenuItem>
        ))}
      </AppInput>
      <div className="grid gap-4 sm:grid-cols-2 ">
        {!isStartDateSkipped && (
          <Controller
            control={form.control}
            name="startDate"
            render={({ field, fieldState }) => (
              <AppDatePicker
                disableFuture
                label={t('REPORT_DATE_SELECT_START')}
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
        )}
        <Controller
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <AppDatePicker
              disableFuture
              label={t('REPORT_DATE_SELECT_START')}
              maxDate={reportDataEnd}
              minDate={reportDataStart}
              name={field.name}
              value={field.value}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
      </div>
      <AppButtonNew
        className="self-start"
        loading={generateReportMutation.isPending}
        onClick={form.handleSubmit((values) => generateReportMutation.mutate(values))}
      >
        {t('REPORT_GENERATE')}
      </AppButtonNew>
      <p>{t.rich('REPORT_CAPTION')}</p>
    </div>
  );
};

export default ReportsForm;
