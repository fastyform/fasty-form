import { z } from 'zod';

export const emailValidator = z
  .string({
    required_error: 'Proszę wprowadzić email.',
  })
  .email({ message: 'Proszę wprowadzić poprawny adres email.' });

export const passwordValidator = z
  .string({ required_error: 'Proszę wprowadzić hasło.' })
  .min(1, 'Proszę wprowadzić hasło.');

export const newPasswordValidator = z.string().min(8, 'Hasło musi mieć co najmniej 8 znaków.');

export const checkboxCheckedValidator = z.literal<boolean>(true);

export const roleSchema = z.enum(['client', 'trainer']);
