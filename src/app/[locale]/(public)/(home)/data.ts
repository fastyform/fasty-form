import Icon0 from './_assets/benefits/icon-0';
import Icon1 from './_assets/benefits/icon-1';
import Icon2 from './_assets/benefits/icon-2';
import Icon3 from './_assets/benefits/icon-3';
import Icon4 from './_assets/benefits/icon-4';
import Icon5 from './_assets/benefits/icon-5';

export const appBenefitsIcons = {
  '0': Icon0,
  '1': Icon1,
  '2': Icon2,
  '3': Icon3,
  '4': Icon4,
  '5': Icon5,
} as const;

export const appBenefitsKeys = Object.keys(appBenefitsIcons) as (keyof typeof appBenefitsIcons)[];
