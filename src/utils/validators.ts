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
