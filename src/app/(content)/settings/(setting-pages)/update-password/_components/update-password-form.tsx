'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import actionUpdatePassword from '@/app/(content)/settings/(setting-pages)/update-password/_actions/action-update-password';
import {
  UpdatePasswordFormValues,
  updatePasswordSchema,
} from '@/app/(content)/settings/(setting-pages)/update-password/_utils';
import QuestionMarkIcon from '@/app/(content)/submissions/[id]/(submission)/_components/trainer-review-form/_assets/question-mark-icon';
import AppButton from '@/components/app-button';
import AppButtonSubmit from '@/components/app-button-submit';
import AppDialog from '@/components/app-dialog';
import AppFormState from '@/components/app-form-error';
import AppInputFormPassword from '@/components/app-input/app-input-form-password';
import { formDefaultState } from '@/utils/form';
import { SearchParam } from '@/utils/types';

const UpdatePasswordForm = ({ redirectPathParam }: { redirectPathParam: SearchParam }) => {
  const passwordFormRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [state, formAction] = useFormState(actionUpdatePassword, formDefaultState);
  const { control, handleSubmit, formState, reset } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
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
          Zmień hasło
        </AppButtonSubmit>
      </form>
      <AppDialog open={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
        <div className="flex flex-col items-center gap-5">
          <QuestionMarkIcon />
          <div className="flex flex-col gap-2.5">
            <div>
              <h4 className="text-center text-base font-bold text-white">Czy chcesz zmienić swoje hasło?</h4>
              <p className="text-center text-sm text-white">Pamiętaj, zmiana hasła jest nieodwracalna.</p>
            </div>
            {redirectPathParam && (
              <p className="text-center text-sm text-white">
                Po zmianie hasła zostaniesz przekierowany na stronę trenera.
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-5">
            <AppButton classes={{ root: 'py-2.5' }} className="text-sm" onClick={handlePasswordUpdate}>
              Zmień hasło
            </AppButton>
            <AppButton
              classes={{ root: 'py-2.5', contained: 'bg-inherit' }}
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
};

export default UpdatePasswordForm;
