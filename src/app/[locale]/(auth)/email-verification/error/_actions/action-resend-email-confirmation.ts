'use server';

import { formSchema } from '@/app/[locale]/(auth)/email-verification/error/_utils';
import { getResponse } from '@/utils';
import Constants from '@/utils/constants';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const actionResendEmailConfirmation = async (prevState: { message: string; isSuccess: boolean }, data: FormData) => {
  const formSchemaParsed = formSchema.safeParse({ email: data.get('email') });

  if (!formSchemaParsed.success) {
    return getResponse('Bad request.');
  }

  const supabase = getSupabaseServerClient(process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const { email } = formSchemaParsed.data;

  const { error } = await supabase.auth.resend({ type: 'signup', email });

  if (!error) {
    return getResponse(
      'Właśnie wysłaliśmy Ci link aktywacyjny. Zerknij na swoją pocztę i aktywuj konto. Czekamy na Ciebie!',
      true,
    );
  }

  if (error.status === 429) {
    return getResponse(
      'Ojej! Wygląda na to, że było już kilka prób wysłania linku aktywacyjnego. Dajmy systemowi chwilę oddechu. Spróbuj ponownie za jakiś czas.',
    );
  }

  return getResponse(Constants.COMMON_ERROR_MESSAGE);
};

export default actionResendEmailConfirmation;
