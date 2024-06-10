import { z } from 'zod';
import { IntlShape } from './types';

export const emailValidator = (t: IntlShape) =>
  z
    .string({
      required_error: t('COMMON_EMAIL_REQUIRED'),
    })
    .email({ message: t('COMMON_EMAIL_INVALID') });

export const passwordValidator = (t: IntlShape) =>
  z.string({ required_error: t('COMMON_PASSWORD_REQUIRED') }).min(1, t('COMMON_PASSWORD_REQUIRED'));

export const newPasswordValidator = (t: IntlShape) => z.string().min(8, t('COMMON_PASSWORD_MIN_LENGTH'));

export const checkboxCheckedValidator = z.literal<boolean>(true);

export const roleSchema = z.enum(['client', 'trainer']);

const PROFILE_NAME_MAX_LENGTH = 40;
export const profileNameValidator = (t: IntlShape) =>
  z
    .string()
    .min(1, t('COMMON_PROFILE_NAME_ERROR_EMPTY'))
    .max(PROFILE_NAME_MAX_LENGTH, t('COMMON_PROFILE_NAME_ERROR_MAX_LENGTH', { count: PROFILE_NAME_MAX_LENGTH }));

const MAX_BIO_CHAR = 200;
export const bioValidator = (t: IntlShape) =>
  z.string().max(MAX_BIO_CHAR, t('ERROR_MAX_CHARACTERS', { max: MAX_BIO_CHAR }));
