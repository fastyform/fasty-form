'use client';

import { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormControlLabel, Switch } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import AppButton from '@/components/app-button';
import Constants from '@/utils/constants';
import notify from '@/utils/notify';
import actionUpdateNotifications from './action-update-notifications';

interface NotificationsFormProps {
  defaultValue: boolean;
  children: ReactNode;
}

const NotificationsForm = ({ defaultValue, children }: NotificationsFormProps) => {
  const form = useForm({ defaultValues: { marketing_consent: defaultValue } });

  const updateNotificationsMutation = useMutation({
    mutationFn: (marketing_consent: boolean) => actionUpdateNotifications(marketing_consent),
    onError: () => notify.error(Constants.COMMON_ERROR_MESSAGE),
    onSuccess: () => notify.success('Zapisano zmiany'),
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
              label="Dodatkowe powiadomienia"
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
      <AppButton
        classes={{ root: 'py-2.5 self-start' }}
        disabled={!form.formState.isDirty}
        loading={updateNotificationsMutation.isPending}
        onClick={form.handleSubmit((values) => updateNotificationsMutation.mutate(values.marketing_consent))}
      >
        Zapisz
      </AppButton>
    </>
  );
};

export default NotificationsForm;
