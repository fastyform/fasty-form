'use server';

import { getTranslations } from 'next-intl/server';
import { forgotPasswordFormSchema } from '@/app/[locale]/(auth)/forgot-password/utils';
import Constants from '@/utils/constants';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { IntlShape, SearchParam } from '@/utils/types';

// NOTE: Temporary solution, because supabase doesn't have inbuilt support for email i18n
const getResetEmailTranslations = (t: IntlShape) => ({
  ResetPassword: {
    SUBJECT: t('MAIL_TEMPLATE_RESET_PASSWORD_SUBJECT', { appName: Constants.APP_NAME }),
    TITLE: t('MAIL_TEMPLATE_RESET_PASSWORD_TITLE'),
    CTA: t('MAIL_TEMPLATE_RESET_PASSWORD_CTA'),
    INTRO: t('MAIL_TEMPLATE_RESET_PASSWORD_INTRO'),
    CONTENT_1: t('MAIL_TEMPLATE_RESET_PASSWORD_CONTENT_1'),
    CONTENT_2: t('MAIL_TEMPLATE_RESET_PASSWORD_CONTENT_2'),
    CONTENT_3: t('MAIL_TEMPLATE_RESET_PASSWORD_CONTENT_3'),
    CONTENT_4: t('MAIL_TEMPLATE_RESET_PASSWORD_CONTENT_4'),
    CONTENT_5: t('MAIL_TEMPLATE_RESET_PASSWORD_CONTENT_5'),
    CONTENT_6: t('MAIL_TEMPLATE_RESET_PASSWORD_CONTENT_6', { appName: Constants.APP_NAME }),
    CONTENT_7: t('MAIL_TEMPLATE_RESET_PASSWORD_CONTENT_7', { appName: Constants.APP_NAME }),
    CONTENT_8: t('MAIL_TEMPLATE_RESET_PASSWORD_CONTENT_8'),
    CONTENT_9: t('MAIL_TEMPLATE_RESET_PASSWORD_CONTENT_9'),
  },
});

interface Payload {
  email: string;
  redirectPathParam: SearchParam;
}

const actionForgotPassword = async ({ email, redirectPathParam }: Payload) => {
  const t = await getTranslations();

  const redirectPath = typeof redirectPathParam === 'string' ? redirectPathParam : '';

  forgotPasswordFormSchema(t).parse({ email });

  const supabase = getSupabaseServerClient(process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const getUserIdByEmailResponse = await supabase.rpc('get_user_id_by_email', { email });

  if (getUserIdByEmailResponse.error) {
    throw new Error();
  }

  const [firstRecord] = getUserIdByEmailResponse.data;

  if (!firstRecord) return;

  const updateUserByIdResponse = await supabase.auth.admin.updateUserById(firstRecord.id, {
    user_metadata: { ...getResetEmailTranslations(t), ConfirmSignup: null },
  });

  if (updateUserByIdResponse.error) {
    throw new Error();
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${Constants.ORIGIN_URL}${redirectPath}`,
  });

  if (error) {
    throw new Error();
  }
};

export default actionForgotPassword;
