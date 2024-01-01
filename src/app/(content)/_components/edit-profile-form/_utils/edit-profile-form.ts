import { z } from 'zod';

export type EditProfileValues = z.infer<typeof editProfileSchema>;

export const editProfileSchema = z.object({
  servicePrice: z.number().min(2).max(10000),
  profileName: z
    .string({ required_error: 'Wprowadź nazwę profilu.' })
    .min(1, 'Wprowadź nazwę profilu.')
    .max(50, 'Nazwa profilu może zawierać maksymalnie 50 znaków.'),
});
