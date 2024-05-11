'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  UpdatePasswordFormValues,
  updatePasswordSchema,
} from '@/app/[locale]/(content)/settings/(setting-pages)/update-password/utils';
import QuestionMarkIcon from '@/app/[locale]/(content)/submissions/[id]/(submission)/_components/trainer-review-form/question-mark-icon';
import AppButton from '@/components/app-button';
import AppButtonSubmit from '@/components/app-button-submit';
import AppDialog from '@/components/app-dialog';
import AppFormState from '@/components/app-form-error';
import AppInputFormPassword from '@/components/app-input/app-input-form-password';
import { formDefaultState } from '@/utils/form';
import { SearchParam } from '@/utils/types';
import actionUpdatePassword from './action-update-password';

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
        <AppInputFormPassword className="w-full" control={control} fieldName="password" label="Hasło" />
        <AppButtonSubmit
          classes={{ root: 'py-2.5' }}
          isValid={formState.isValid}
          type="button"
          onClick={() => formState.isValid && setIsConfirmModalOpen(true)}
        >
          {t('SETTINGS_PASSWORD_CHANGE')}
        </AppButtonSubmit>
      </form>
      <AppDialog open={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
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
            <AppButton classes={{ root: 'py-2.5' }} className="text-sm" onClick={handlePasswordUpdate}>
              {t('SETTINGS_PASSWORD_CHANGE')}
            </AppButton>
            <AppButton
              classes={{ root: 'py-2.5', contained: 'bg-inherit' }}
              className="text-sm text-white"
              onClick={() => setIsConfirmModalOpen(false)}
            >
              {t('COMMON_CANCEL')}
            </AppButton>
          </div>
        </div>
      </AppDialog>
    </>
  );
};

export default UpdatePasswordForm;
