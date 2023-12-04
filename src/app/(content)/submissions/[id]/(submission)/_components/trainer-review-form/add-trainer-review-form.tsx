'use client';

import { useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import SubmissionPartWithIcon from '@/app/(content)/submissions/[id]/(submission)/_components/submission-part-with-icon';
import ErrorIcon from '@/assets/error-icon';
import AppButton from '@/components/app-button';
import AppButtonSubmit from '@/components/app-button-submit';
import AppDialog from '@/components/app-dialog';
import AppInputForm from '@/components/app-input/app-input-form';
import actionAddTrainerReview from './_actions/action-add-trainer-review';
import QuestionMarkIcon from './_assets/question-mark-icon';
import { trainerReviewFormSchema, TrainerReviewValues } from './_utils';

const AddTrainerReviewForm = ({ submissionId }: { submissionId: string }) => {
  const [isReviewInputVisible, setIsReviewInputVisible] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [state, formAction] = useFormState(actionAddTrainerReview, { message: '' });
  const formRef = useRef<HTMLFormElement>(null);
  const { control, handleSubmit, formState } = useForm<TrainerReviewValues>({
    resolver: zodResolver(trainerReviewFormSchema),
    defaultValues: { trainerReview: '' },
    mode: 'onTouched',
  });

  const handleFormAction = (data: FormData) => handleSubmit(() => formAction({ data, submissionId }))();

  const handleReviewAddConfirmation = () => {
    if (formRef.current === null) return;
    formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    setIsConfirmModalOpen(false);
  };

  if (isReviewInputVisible) {
    return (
      <>
        <SubmissionPartWithIcon icon="description">
          <h2 className="text-lg font-bold leading-5 text-white">Twoja odpowiedź</h2>
          <form ref={formRef} action={handleFormAction} className="flex flex-col gap-5">
            {state?.message && (
              <span className="inline-flex items-center gap-2 text-red-400">
                <ErrorIcon className="min-w-[17px]" />
                {state.message}
              </span>
            )}
            <p className="text-sm text-white">Po dodaniu oceny filmiku, nie będziesz miał możliwości jej edycji.</p>
            <AppInputForm<TrainerReviewValues>
              multiline
              className="w-full"
              control={control}
              fieldName="trainerReview"
              minRows={10}
            />
            <AppButtonSubmit
              isValid={formState.isValid}
              type="button"
              onClick={() => formState.isValid && setIsConfirmModalOpen(true)}
            >
              Dodaj ocenę filmiku
            </AppButtonSubmit>
          </form>
        </SubmissionPartWithIcon>
        <AppDialog open={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
          <div className="flex flex-col items-center gap-5">
            <QuestionMarkIcon />
            <div>
              <h4 className="text-center text-base font-bold text-white">Czy chcesz dodać swoją ocenę?</h4>
              <p className="text-center text-sm text-white">
                Po dodaniu oceny filmiku, nie będziesz miał możliwości jej edycji.
              </p>
            </div>
            <div className="flex flex-wrap gap-5">
              <AppButton classes={{ root: 'py-2.5' }} className="text-sm" onClick={handleReviewAddConfirmation}>
                Dodaj
              </AppButton>
              <AppButton
                classes={{ root: 'py-2.5 bg-inherit' }}
                className="text-sm text-white"
                onClick={() => setIsConfirmModalOpen(false)}
              >
                Anuluj
              </AppButton>
            </div>
          </div>
        </AppDialog>
      </>
    );
  }

  return (
    <SubmissionPartWithIcon containerStyles="opacity-50" icon="description">
      <Button
        className=" flex justify-start p-0 text-left normal-case"
        color="inherit"
        onClick={() => setIsReviewInputVisible(true)}
      >
        <h2 className="text-lg font-bold leading-5 text-white">Kliknij tutaj, aby dodać odpowiedź</h2>
      </Button>
    </SubmissionPartWithIcon>
  );
};

export default AddTrainerReviewForm;
