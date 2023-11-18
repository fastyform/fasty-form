'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '@mui/material';
import SubmissionPartWithIcon from '@/app/(content)/submissions/[id]/_components/submission-part-with-icon';
import ErrorIcon from '@/assets/error-icon';
import AppButton from '@/components/app-button';
import AppInputForm from '@/components/app-input/app-input-form';
import actionUpdateTrainerReview from './_actions/action-update-trainer-review';
import { trainerReviewFormSchema, TrainerReviewValues } from './_utils';

const SubmitButton = ({ isValid }: { isValid: boolean }) => {
  const { pending } = useFormStatus();

  const isLoading = pending && isValid;

  return (
    <AppButton disabled={isLoading} loading={isLoading} type="submit">
      Dodaj ocenę filmiku
    </AppButton>
  );
};

const TrainerReviewForm = ({ submissionId }: { submissionId: string }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [state, formAction] = useFormState(actionUpdateTrainerReview, { message: '' });

  const { control, handleSubmit, formState } = useForm<TrainerReviewValues>({
    resolver: zodResolver(trainerReviewFormSchema),
    defaultValues: { trainerReview: '' },
    mode: 'onTouched',
  });

  const handleFormAction = (data: FormData) => handleSubmit(() => formAction({ data, submissionId }))();

  if (isEditOpen) {
    return (
      <SubmissionPartWithIcon icon="description">
        <Typography className="text-lg font-bold leading-5 text-white" variant="h2">
          Twoja odpowiedź
        </Typography>
        <form action={handleFormAction} className="flex flex-col gap-5">
          {state?.message && (
            <span className="inline-flex items-center gap-2 text-red-400">
              <ErrorIcon className="min-w-[17px]" />
              {state.message}
            </span>
          )}
          <Typography className="text-sm text-white">
            Po dodaniu oceny filmiku, nie będziesz miał możliwości jej edycji.
          </Typography>
          <AppInputForm<TrainerReviewValues>
            multiline
            className="w-full"
            control={control}
            fieldName="trainerReview"
            minRows={10}
          />
          <SubmitButton isValid={formState.isValid} />
        </form>
      </SubmissionPartWithIcon>
    );
  }

  return (
    <SubmissionPartWithIcon containerStyles="opacity-50" icon="description">
      <Button className=" flex p-0 text-left normal-case" color="inherit" onClick={() => setIsEditOpen(true)}>
        <Typography className="text-lg font-bold leading-5 text-white" variant="h2">
          Kliknij tutaj, aby dodać odpowiedź
        </Typography>
      </Button>
    </SubmissionPartWithIcon>
  );
};

export default TrainerReviewForm;
