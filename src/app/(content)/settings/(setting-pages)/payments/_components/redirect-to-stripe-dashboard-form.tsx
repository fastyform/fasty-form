'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import actionStripeDashboardRedirect from '@/app/(content)/settings/(setting-pages)/payments/_actions/action-stripe-dashboard-redirect';
import AppButtonSubmit from '@/components/app-button-submit';
import { formDefaultState } from '@/utils/form';
import notify from '@/utils/notify';

const RedirectToStripeDashboardForm = () => {
  const [state, formAction] = useFormState(actionStripeDashboardRedirect, formDefaultState);

  useEffect(() => {
    if (!state.isSuccess && state.message) {
      notify.error(state.message);
    }
  }, [state.isSuccess, state.message]);

  return (
    <form action={formAction}>
      <AppButtonSubmit isValid classes={{ root: 'py-2.5' }}>
        Panel płatności
      </AppButtonSubmit>
    </form>
  );
};

export default RedirectToStripeDashboardForm;
