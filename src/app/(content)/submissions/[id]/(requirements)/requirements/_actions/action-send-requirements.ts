'use server';

import { FormState } from '@/utils/form';

const actionSendRequirements = (prevState: FormState, data: FormData) => {
  console.log(data);

  return { message: 'success', isSuccess: true };
};

export default actionSendRequirements;
