import { z } from 'zod';

import { IntlShape } from '@/utils/types';
import { bioValidator, profileNameValidator } from '@/utils/validators';

export const editPriceFormSchema = z.object({
  servicePrice: z.number().min(2).max(10000),
});

export const getProfileNameFormSchema = (t: IntlShape) => z.object({ profileName: profileNameValidator(t) });

export const getProfileBioFormSchema = (t: IntlShape) => z.object({ bio: bioValidator(t) });
