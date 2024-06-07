'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import actionUpdatePassword from '@/app/[locale]/(app)/(content)/settings/(setting-pages)/account/actions/action-update-password';
import {
  UpdatePasswordFormValues,
  updatePasswordSchema,
} from '@/app/[locale]/(app)/(content)/settings/(setting-pages)/account/utils';
import QuestionMarkIcon from '@/app/[locale]/(app)/(content)/submissions/[id]/(submission)/_components/trainer-review-form/question-mark-icon';
import AppButton from '@/components/app-button';
import AppButtonSubmit from '@/components/app-button-submit';
import AppFormState from '@/components/app-form-error';
import AppInputFormPassword from '@/components/app-input/app-input-form-password';
import AppModal from '@/components/app-modal';
import { formDefaultState } from '@/utils/form';
import { SearchParam } from '@/utils/types';

const UpdatePasswordForm = ({ redirectPathParam }: { redirectPathParam: SearchParam }) => {
  const t = useTranslations();
  const passwordFormRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [state, formAction] = useFormState(actionUpdatePassword, formDefaultState);
  const { control, handleSubmit, formState, reset } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema(t)),
    defaultValues: { password: '' },
    mode: 'onTouched',
  });

  const handlePasswordUpdate = () => {
    if (passwordFormRef.current === null) return;
    passwordFormRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    setIsConfirmModalOpen(false);
  };

  const handleFormAction = (data: FormData) => handleSubmit(() => formAction(data))();

  useEffect(() => {
    if (state?.isSuccess) {
      reset();
      if (typeof redirectPathParam === 'string') router.push(redirectPathParam);
    }
  }, [state, reset, redirectPathParam, router]);

  return (
    <>
      <form ref={passwordFormRef} action={handleFormAction} className="flex max-w-md flex-col items-start gap-5">
        <AppFormState state={state} />
        <AppInputFormPassword
          className="w-full"
          control={control}
          fieldName="password"
          label={t('COMMON_PASSWORD_LABEL')}
        />
        <AppButtonSubmit
          isValid={formState.isValid}
          type="button"
          onClick={() => formState.isValid && setIsConfirmModalOpen(true)}
        >
          {t('SETTINGS_PASSWORD_CHANGE')}
        </AppButtonSubmit>
      </form>
      <AppModal open={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
        <div className="flex flex-col items-center gap-5">
          <QuestionMarkIcon />
          <div className="flex flex-col gap-2.5">
            <div>
              <h4 className="text-center text-base font-bold text-white">{t('SETTINGS_PASSWORD_DIALOG_TITLE')}</h4>
              <p className="text-center text-sm text-white">{t('SETTINGS_PASSWORD_DIALOG_DESCRIPTION')}</p>
            </div>
            {redirectPathParam && (
              <p className="text-center text-sm text-white">{t('SETTINGS_PASSWORD_DIALOG_REDIRECT_DESCRIPTION')}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-5">
            <AppButton size="small" onClick={handlePasswordUpdate}>
              {t('SETTINGS_PASSWORD_CHANGE')}
            </AppButton>
            <AppButton color="secondary" size="small" variant="text" onClick={() => setIsConfirmModalOpen(false)}>
              {t('COMMON_CANCEL')}
            </AppButton>
          </div>
        </div>
      </AppModal>
    </>
  );
};

export default UpdatePasswordForm;
