'use client';

import { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormControlLabel, Switch } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import AppButtonNew from '@/components/app-button-new';
import notify from '@/utils/notify';
import actionUpdateNotifications from './action-update-notifications';

interface NotificationsFormProps {
  defaultValue: boolean;
  children: ReactNode;
}

const NotificationsForm = ({ defaultValue, children }: NotificationsFormProps) => {
  const t = useTranslations();
  const form = useForm({ defaultValues: { marketing_consent: defaultValue } });

  const updateNotificationsMutation = useMutation({
    mutationFn: (marketing_consent: boolean) => actionUpdateNotifications(marketing_consent),
    onError: () => notify.error(t('COMMON_ERROR')),
    onSuccess: () => notify.success(t('COMMON_CHANGES_SAVED')),
  });

  return (
    <>
      <div className="flex flex-col items-start gap-2">
        <Controller
          control={form.control}
          name="marketing_consent"
          render={({ field }) => (
            <FormControlLabel
              classes={{ label: 'text-white' }}
              label={t('SETTINGS_NOTIFICATIONS_LABEL')}
              name={field.name}
              control={
                <Switch
                  ref={field.ref}
                  checked={field.value}
                  className="[&_.MuiSwitch-switchBase+.MuiSwitch-track]:bg-gray-500 [&_.MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track]:bg-yellow-400 [&_.MuiSwitch-switchBase.Mui-checked]:text-yellow-400"
                  onChange={(_, value) => field.onChange(value)}
                />
              }
            />
          )}
        />
        {children}
      </div>
      <AppButtonNew
        className="self-start"
        disabled={!form.formState.isDirty}
        loading={updateNotificationsMutation.isPending}
        onClick={form.handleSubmit((values) => updateNotificationsMutation.mutate(values.marketing_consent))}
      >
        {t('COMMON_SAVE')}
      </AppButtonNew>
    </>
  );
};

export default NotificationsForm;
