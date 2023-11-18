'use client';

import { useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Dialog, Typography } from '@mui/material';
import SubmissionPartWithIcon from '@/app/(content)/submissions/[id]/_components/submission-part-with-icon';
import ErrorIcon from '@/assets/error-icon';
import AppButton from '@/components/app-button';
import AppInputForm from '@/components/app-input/app-input-form';
import actionUpdateTrainerReview from './_actions/action-update-trainer-review';
import QuestionMarkIcon from './_assets/question-mark-icon';
import { trainerReviewFormSchema, TrainerReviewValues } from './_utils';

const SubmitButton = ({ isValid, onClick }: { isValid: boolean; onClick: () => void }) => {
  const { pending } = useFormStatus();

  const isLoading = pending && isValid;

  return (
    <AppButton className="!py-2.5 text-sm" disabled={isLoading} loading={isLoading} onClick={onClick}>
      Dodaj ocenę filmiku
    </AppButton>
  );
};

const TrainerReviewForm = ({ submissionId }: { submissionId: string }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [state, formAction] = useFormState(actionUpdateTrainerReview, { message: '' });
  const formRef = useRef<HTMLFormElement>(null);
  const { control, handleSubmit, formState } = useForm<TrainerReviewValues>({
    resolver: zodResolver(trainerReviewFormSchema),
    defaultValues: { trainerReview: '' },
    mode: 'onTouched',
  });

  const handleFormAction = (data: FormData) => handleSubmit(() => formAction({ data, submissionId }))();

  const handleReviewAddConfirmation = () => {
    if (formRef?.current === null) return;
    formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    setIsConfirmModalOpen(false);
  };

  if (isEditOpen) {
    return (
      <>
        <SubmissionPartWithIcon icon="description">
          <Typography className="text-lg font-bold leading-5 text-white" variant="h2">
            Twoja odpowiedź
          </Typography>
          <form ref={formRef} action={handleFormAction} className="flex flex-col gap-5">
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
            <SubmitButton
              isValid={formState.isValid}
              onClick={() => formState.isValid && setIsConfirmModalOpen(true)}
            />
          </form>
        </SubmissionPartWithIcon>
        <Dialog
          classes={{ paper: 'rounded-xl border border-gray-600 bg-[#1e2226] py-10 px-5' }}
          open={isConfirmModalOpen}
        >
          <div className="flex flex-col items-center gap-5">
            <QuestionMarkIcon />
            <div>
              <Typography className="text-center text-base font-bold text-white" variant="h4">
                Czy chcesz dodać swoją ocenę?
              </Typography>
              <Typography className="text-center text-sm text-white">
                Po dodaniu oceny filmiku, nie będziesz miał możliwości jej edycji.
              </Typography>
            </div>
            <div className="flex flex-col gap-2.5">
              <AppButton className=" !py-2.5 text-sm" onClick={handleReviewAddConfirmation}>
                Dodaj ocenę filmiku
              </AppButton>
              <AppButton className="bg-inherit !py-2.5 text-sm text-white" onClick={() => setIsConfirmModalOpen(false)}>
                Anuluj
              </AppButton>
            </div>
          </div>
        </Dialog>
      </>
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
