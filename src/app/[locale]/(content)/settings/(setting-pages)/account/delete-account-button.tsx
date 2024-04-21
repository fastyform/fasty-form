'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import actionDeleteAccount from '@/app/[locale]/(content)/settings/(setting-pages)/account/action-delete-account';
import AppButton from '@/components/app-button';
import AppDialog from '@/components/app-dialog';
import notify from '@/utils/notify';

const DeleteAccountButton = ({ userId }: { userId: string }) => {
  const t = useTranslations();
  const [isActionPending, setIsActionPending] = useState(false);
  const [open, setOpen] = useState(false);

  const deleteAccountMutation = useMutation({
    mutationFn: () => actionDeleteAccount(userId),
    onMutate: () => setIsActionPending(true),
    onError: () => {
      notify.error(t('SETTINGS_ACCOUNT_DELETE_ERROR'));
      setIsActionPending(false);
    },
  });

  return (
    <>
      <AppButton classes={{ root: 'w-fit py-2.5', contained: 'bg-red-400' }} onClick={() => setOpen(true)}>
        {t('SETTINGS_ACCOUNT_DELETE_BUTTON')}
      </AppButton>
      <AppDialog open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col items-center gap-5 text-center">
          <h1 className="text-xl font-semibold">{t('SETTINGS_ACCOUNT_DELETE_DIALOG_TITLE')}</h1>
          <div className="flex flex-wrap gap-5">
            <AppButton
              classes={{ root: 'py-2.5' }}
              loading={isActionPending}
              variant="outlined"
              onClick={deleteAccountMutation.mutate}
            >
              {t('COMMON_YES')}
            </AppButton>
            <AppButton classes={{ root: 'py-2.5' }} disabled={isActionPending} onClick={() => setOpen(false)}>
              {t('COMMON_CANCEL')}
            </AppButton>
          </div>
        </div>
      </AppDialog>
    </>
  );
};

export default DeleteAccountButton;
