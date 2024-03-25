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
import actionSendFeedback from '@/app/(content)/feedback/action-send-feedback';
import { feedbackFormSchema, FeedbackValues } from '@/app/(content)/feedback/utils';
import AppButton from '@/components/app-button';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import Constants from '@/utils/constants';
import notify from '@/utils/notify';

const FEEDBACK_TOGGLE_BUTTON_DATA = ['bad', 'mixed', 'good'];
const NEW_FEATURES = [
  'Baza trenerów z możliwością wyszukiwania i filtrowania',
  'Zaznaczanie błędów na wideo (np. rysowanie po wideo)',
  'Większa ilość usług (np. plany treningowe, diety)',
  'Możliwość dodania plików do odpowiedzi na zgłoszenie',
];

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
  const { handleSubmit, control, reset, setValue } = useForm<FeedbackValues>({
    defaultValues: {
      appFeelingDescription: '',
      radio: '',
      other: '',
    },
    resolver: zodResolver(feedbackFormSchema),
  });

  const sendFeedbackMutation = useMutation({
    mutationFn: (data: FeedbackValues) => actionSendFeedback(data),
    onError: () => {
      notify.error(Constants.COMMON_ERROR_MESSAGE);
    },
    onSuccess: () => {
      notify.success('Dziękujemy za przesłanie opinii!');
      reset();
    },
  });

  return (
    <form
      className="flex w-full flex-col gap-10 text-lg font-medium text-white [&_textarea]:!h-[115px]"
      onSubmit={handleSubmit((data: FeedbackValues) => sendFeedbackMutation.mutate(data))}
    >
      <div className="flex flex-col gap-5">
        <p>Jak się czujesz, korzystając z naszej aplikacji? Podziel się swoimi emocjami!</p>
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
        <p>
          Czy możesz nam powiedzieć więcej? Każdy szczegół jest dla nas cenny! (To pole jest opcjonalne, ale bardzo
          doceniamy Twoją otwartość)
        </p>
        <AppInputForm fullWidth multiline control={control} fieldName="appFeelingDescription" minRows={5} />
      </div>
      <div className="flex flex-col gap-5">
        <p>Które nowości wzbudzają Twoje zainteresowanie? Pomóż nam kształtować przyszłość naszej aplikacji!</p>
        <Controller
          control={control}
          name="radio"
          render={({ field, fieldState }) => (
            <>
              {fieldState.error?.message && (
                <AppFormState state={{ isSuccess: false, message: fieldState.error.message }} />
              )}
              <RadioGroup value={field.value} onChange={(_, value) => field.onChange(value)}>
                {NEW_FEATURES.map((value) => (
                  <FormControlLabel
                    key={value}
                    classes={{ label: 'font-light text-sm' }}
                    control={<RadioButton />}
                    label={value}
                    value={value}
                  />
                ))}
                <div className="flex items-start gap-2">
                  <FormControlLabel
                    classes={{ label: 'font-light text-sm' }}
                    control={<RadioButton />}
                    label="Inne"
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
        Wyślij swoją opinię
      </AppButton>
    </form>
  );
};

export default FeedbackForm;
