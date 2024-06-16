import CrossedCard from './_assets/benefits/crossed-card';
import CrossedTimer from './_assets/benefits/crossed-timer';
import Diamond from './_assets/benefits/diamond';
import FullCalendar from './_assets/benefits/full-calendar';
import Income from './_assets/benefits/income';
import Lightning from './_assets/benefits/lightning';

export const heroBenefits = ['earnings', 'simple_tool', 'scale_business'] as const;

export const appBenefitsIcons = {
  Income,
  FullCalendar,
  CrossedTimer,
  Lightning,
  Diamond,
  CrossedCard,
} as const;

export const appBenefitsKeys = Object.keys(appBenefitsIcons) as (keyof typeof appBenefitsIcons)[];
