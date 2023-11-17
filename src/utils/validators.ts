import { z } from 'zod';

export const emailValidator = z
  .string({
    required_error: 'Proszę wprowadzić email.',
  })
  .email({ message: 'Proszę wprowadzić poprawny adres email.' });
