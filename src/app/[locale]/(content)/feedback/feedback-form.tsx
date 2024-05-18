'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioProps,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonProps,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import actionSendFeedback from '@/app/[locale]/(content)/feedback/action-send-feedback';
import { feedbackFormSchema, FeedbackValues } from '@/app/[locale]/(content)/feedback/utils';
import AppButton from '@/components/app-button';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import notify from '@/utils/notify';

const FEEDBACK_TOGGLE_BUTTON_DATA = ['bad', 'mixed', 'good'];

const FeedbackToggleButton = (props: Omit<ToggleButtonProps, 'classes'>) => (
  <ToggleButton
    {...props}
    disableRipple
    classes={{
      root: 'bg-shark border border-solid border-gray-600 rounded-full w-20 h-20',
      selected: '!bg-bunker border-yellow-400',
    }}
  />
);

const RadioButton = (props: RadioProps) => <Radio {...props} className="text-yellow-400" />;

const FeedbackForm = () => {
  const t = useTranslations();
  const { handleSubmit, control, reset, setValue } = useForm<FeedbackValues>({
    defaultValues: {
      appFeelingDescription: '',
      radio: '',
      other: '',
    },
    resolver: zodResolver(feedbackFormSchema(t)),
  });

  const sendFeedbackMutation = useMutation({
    mutationFn: (data: FeedbackValues) => actionSendFeedback(data),
    onError: () => {
      notify.error(t('COMMON_ERROR'));
    },
    onSuccess: () => {
      notify.success(t('FEEDBACK_SENT_SUCCESS'));
      reset();
    },
  });

  return (
    <form
      className="flex w-full flex-col gap-10 text-lg font-medium text-white [&_textarea]:!h-[115px]"
      onSubmit={handleSubmit((data: FeedbackValues) => sendFeedbackMutation.mutate(data))}
    >
      <div className="flex flex-col gap-5">
        <p>{t('FEEDBACK_FEELINGS_TITLE')}</p>
        <Controller
          control={control}
          name="appFeeling"
          render={({ field }) => (
            <ToggleButtonGroup exclusive {...field} classes={{ root: 'flex gap-2.5' }}>
              {FEEDBACK_TOGGLE_BUTTON_DATA.map((value) => (
                <FeedbackToggleButton key={value} value={value}>
                  <Image
                    alt=""
                    className="pointer-events-none select-none"
                    height={30}
                    src={`/${value}.png`}
                    width={30}
                  />
                </FeedbackToggleButton>
              ))}
            </ToggleButtonGroup>
          )}
        />
      </div>
      <div className="flex flex-col gap-5">
        <p>{t('FEEDBACK_FEELINGS_DESCRIPTION')}</p>
        <AppInputForm fullWidth multiline control={control} fieldName="appFeelingDescription" minRows={5} />
      </div>
      <div className="flex flex-col gap-5">
        <p>{t('FEEDBACK_FEATURES_TITLE')}</p>
        <Controller
          control={control}
          name="radio"
          render={({ field, fieldState }) => (
            <>
              {fieldState.error?.message && (
                <AppFormState state={{ isSuccess: false, message: fieldState.error.message }} />
              )}
              <RadioGroup value={field.value} onChange={(_, value) => field.onChange(value)}>
                {(['0', '1', '2', '3'] as const).map((value) => (
                  <FormControlLabel
                    key={value}
                    classes={{ label: 'font-light text-sm' }}
                    control={<RadioButton />}
                    label={t(`FEEDBACK_FEATURES_${value}`)}
                    value={t(`FEEDBACK_FEATURES_${value}`)}
                  />
                ))}
                <div className="flex items-start gap-2">
                  <FormControlLabel
                    classes={{ label: 'font-light text-sm' }}
                    control={<RadioButton />}
                    label={t('FEEDBACK_FEATURES_OTHER')}
                    value="other"
                  />
                  <AppInputForm
                    fullWidth
                    className="mt-1"
                    control={control}
                    fieldName="other"
                    InputProps={{ classes: { input: 'py-1.5', root: 'rounded-[6px]' } }}
                    onChange={() => setValue('radio', 'other')}
                  />
                </div>
              </RadioGroup>
            </>
          )}
        />
      </div>
      <AppButton classes={{ root: 'w-fit py-2.5' }} loading={sendFeedbackMutation.isPending} type="submit">
        {t('FEEDBACK_SEND')}
      </AppButton>
    </form>
  );
};

export default FeedbackForm;
