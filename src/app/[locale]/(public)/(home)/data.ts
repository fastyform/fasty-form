import CrossedCard from './_assets/benefits/crossed-card';
import CrossedTimer from './_assets/benefits/crossed-timer';
import Diamond from './_assets/benefits/diamond';
import FullCalendar from './_assets/benefits/full-calendar';
import Income from './_assets/benefits/income';
import Lightning from './_assets/benefits/lightning';
import One from './_assets/one';
import Three from './_assets/three';
import Two from './_assets/two';

export const stepsData = {
  one: [One, 'sm:ml-0'],
  two: [Two, 'sm:ml-[10vw] xl:ml-[8vw]'],
  three: [Three, 'sm:ml-[20vw] xl:ml-[16vw]'],
} as const;
export const stepsDataKeys = Object.keys(stepsData) as (keyof typeof stepsData)[];

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
