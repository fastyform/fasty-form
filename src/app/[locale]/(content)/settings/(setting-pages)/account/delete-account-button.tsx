'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import actionDeleteAccount from '@/app/[locale]/(content)/settings/(setting-pages)/account/action-delete-account';
import AppButton from '@/components/app-button';
import AppDialog from '@/components/app-dialog';
import notify from '@/utils/notify';

const DeleteAccountButton = ({ userId }: { userId: string }) => {
  const [isActionPending, setIsActionPending] = useState(false);
  const [open, setOpen] = useState(false);

  const deleteAccountMutation = useMutation({
    mutationFn: () => actionDeleteAccount(userId),
    onMutate: () => setIsActionPending(true),
    onError: () => {
      notify.error('Wystąpił błąd podczas usuwania konta. Spróbuj ponownie.');
      setIsActionPending(false);
    },
  });

  return (
    <>
      <AppButton classes={{ root: 'w-fit py-2.5', contained: 'bg-red-400' }} onClick={() => setOpen(true)}>
        Usuń swoje konto
      </AppButton>
      <AppDialog open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-center text-xl">Czy na pewno chcesz usunąć swoje konto?</h1>
          <div className="flex flex-wrap gap-5">
            <AppButton
              classes={{ root: 'py-2.5' }}
              loading={isActionPending}
              variant="outlined"
              onClick={deleteAccountMutation.mutate}
            >
              Tak
            </AppButton>
            <AppButton classes={{ root: 'py-2.5' }} disabled={isActionPending} onClick={() => setOpen(false)}>
              Anuluj
            </AppButton>
          </div>
        </div>
      </AppDialog>
    </>
  );
};

export default DeleteAccountButton;
