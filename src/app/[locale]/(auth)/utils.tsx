import { z } from 'zod';
import Constants from '@/utils/constants';
import { IntlShape } from '@/utils/types';
import { emailValidator, newPasswordValidator } from '@/utils/validators';

export const QUERY_PARAM_ERRORS = ['ALREADY_REGISTERED', 'UNEXPECTED', 'NOT_REGISTERED'] as const;

export type QueryParamError = (typeof QUERY_PARAM_ERRORS)[number];

export const getQueryParamError = (queryParam: QueryParamError) => `error=${queryParam}`;

export const registerSchema = (t: IntlShape) =>
  z.object({
    email: emailValidator(t),
    password: newPasswordValidator(t),
  });

export type FormValues = z.infer<ReturnType<typeof registerSchema>>;

// NOTE: Temporary solution, because supabase doesn't have inbuilt support for email i18n
export const getConfirmSignupEmailTranslations = (t: IntlShape) => ({
  ConfirmSignup: {
    SUBJECT: t('MAIL_TEMPLATE_CONFIRM_SIGNUP_SUBJECT', { appName: Constants.APP_NAME }),
    TITLE: t('MAIL_TEMPLATE_CONFIRM_SIGNUP_TITLE'),
    CTA: t('MAIL_TEMPLATE_CONFIRM_SIGNUP_CTA'),
    INTRO: t('MAIL_TEMPLATE_CONFIRM_SIGNUP_INTRO'),
    CONTENT_1: t('MAIL_TEMPLATE_CONFIRM_SIGNUP_CONTENT_1'),
    CONTENT_2: t('MAIL_TEMPLATE_CONFIRM_SIGNUP_CONTENT_2'),
    CONTENT_3: t('MAIL_TEMPLATE_CONFIRM_SIGNUP_CONTENT_3'),
    CONTENT_4: t('MAIL_TEMPLATE_CONFIRM_SIGNUP_CONTENT_4'),
    CONTENT_5: t('MAIL_TEMPLATE_CONFIRM_SIGNUP_CONTENT_5'),
    CONTENT_6: t('MAIL_TEMPLATE_CONFIRM_SIGNUP_CONTENT_6'),
    CONTENT_7: t('MAIL_TEMPLATE_CONFIRM_SIGNUP_CONTENT_7'),
    CONTENT_8: t('MAIL_TEMPLATE_CONFIRM_SIGNUP_CONTENT_8', { appName: Constants.APP_NAME }),
    CONTENT_9: t('MAIL_TEMPLATE_CONFIRM_SIGNUP_CONTENT_9', { appName: Constants.APP_NAME }),
    CONTENT_10: t('MAIL_TEMPLATE_CONFIRM_SIGNUP_CONTENT_10'),
    CONTENT_11: t('MAIL_TEMPLATE_CONFIRM_SIGNUP_CONTENT_11'),
  },
});
