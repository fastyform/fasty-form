'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import SubmissionPartWithIcon from '@/app/[locale]/(content)/submissions/[id]/(submission)/_components/submission-part-with-icon';
import AppButtonNew from '@/components/app-button-new';
import AppInputForm from '@/components/app-input/app-input-form';
import AppModal from '@/components/app-modal';
import notify from '@/utils/notify';
import actionAddTrainerReview from './action-add-trainer-review';
import QuestionMarkIcon from './question-mark-icon';
import { trainerReviewFormSchema, TrainerReviewValues } from './utils';

const AddTrainerReviewForm = ({ submissionId }: { submissionId: string }) => {
  const t = useTranslations();
  const [isReviewInputVisible, setIsReviewInputVisible] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const form = useForm<TrainerReviewValues>({
    resolver: zodResolver(trainerReviewFormSchema(t)),
    defaultValues: { trainerReview: '' },
    mode: 'onTouched',
  });

  const addTrainerReviewMutation = useMutation({
    mutationFn: () => actionAddTrainerReview({ trainerReview: form.getValues('trainerReview'), submissionId }),
    onError: () => notify.error(t('COMMON_ERROR')),
    onMutate: () => setIsConfirmModalOpen(false),
  });

  if (isReviewInputVisible) {
    return (
      <>
        <SubmissionPartWithIcon verticalLine icon="description" verticalLineClassName="mb-20">
          <h2 className="text-lg font-bold leading-5 text-white">
            {t('SUBMISSION_TRAINER_REVIEW_FORM_REPLY_LABEL_TRAINER')}
          </h2>
          <form className="flex flex-col gap-5">
            <p className="text-sm text-white">{t('SUBMISSION_TRAINER_REVIEW_FORM_WARNING')}</p>
            <AppInputForm multiline className="w-full" control={form.control} fieldName="trainerReview" minRows={10} />
            <AppButtonNew
              loading={addTrainerReviewMutation.isPending}
              size="large"
              onClick={form.handleSubmit(() => setIsConfirmModalOpen(true))}
            >
              {t('SUBMISSION_TRAINER_REVIEW_FORM_ADD_REVIEW')}
            </AppButtonNew>
          </form>
        </SubmissionPartWithIcon>
        <AppModal open={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
          <div className="flex flex-col items-center gap-5">
            <QuestionMarkIcon />
            <div>
              <h4 className="text-center text-base font-bold text-white">
                {t('SUBMISSION_TRAINER_REVIEW_FORM_DIALOG_TITLE')}
              </h4>
              <p className="text-center text-sm text-white">{t('SUBMISSION_TRAINER_REVIEW_FORM_WARNING')}</p>
            </div>
            <div className="flex flex-wrap gap-5">
              <AppButtonNew onClick={() => addTrainerReviewMutation.mutate()}>
                {t('SUBMISSION_TRAINER_REVIEW_FORM_DIALOG_CONFIRM')}
              </AppButtonNew>
              <AppButtonNew color="secondary" variant="text" onClick={() => setIsConfirmModalOpen(false)}>
                {t('COMMON_CANCEL')}
              </AppButtonNew>
            </div>
          </div>
        </AppModal>
      </>
    );
  }

  return (
    <SubmissionPartWithIcon className="opacity-50" icon="description">
      <Button
        className=" flex justify-start p-0 text-left normal-case"
        color="inherit"
        onClick={() => setIsReviewInputVisible(true)}
      >
        <h2 className="text-lg font-bold leading-5 text-white">{t('SUBMISSION_TRAINER_REVIEW_FORM_TITLE')}</h2>
      </Button>
    </SubmissionPartWithIcon>
  );
};

export default AddTrainerReviewForm;
