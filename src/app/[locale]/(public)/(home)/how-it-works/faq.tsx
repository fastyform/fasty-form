'use client';

import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useTranslations } from 'next-intl';
import { APP_FEE, calculateStripeFee, groszToPLN, StripeConstants } from '@/utils/stripe';

const FAQ_KEYS = [1, 2, 3, 4, 5] as const;
type FaqQuestion = (typeof FAQ_KEYS)[number];

const EXAMPLE_PRICE_IN_GROSZ = 2000;
const EXAMPLE_PRICE_IN_PLN = groszToPLN(EXAMPLE_PRICE_IN_GROSZ);
const CUMULATIVE_PERCENTAGE_FEE = APP_FEE + StripeConstants.STRIPE_FEE_PERCENTAGE;
const STRIPE_FIXED_FEE_PLN = groszToPLN(StripeConstants.STRIPE_FEE_FIXED_IN_GROSZ);
const STRIPE_EXAMPLE_FEE_PLN = groszToPLN(calculateStripeFee(EXAMPLE_PRICE_IN_GROSZ));

const FAQ = () => {
  const t = useTranslations();
  const [expanded, setExpanded] = useState<FaqQuestion | null>(null);

  const currency = t('CURRENCY_PLN');

  return (
    <div className="mx-auto w-full">
      {FAQ_KEYS.map((key) => (
        <Accordion
          key={key}
          classes={{ root: 'border border-solid border-gray-600 bg-none' }}
          expanded={expanded === key}
          onChange={(_: unknown, newExpanded: boolean) => setExpanded(newExpanded ? key : null)}
        >
          <AccordionSummary classes={{ root: 'bg-shark text-lg bg-none' }} expandIcon={<ArrowDropDownIcon />}>
            {t(`HOW_IT_WORKS_FAQ_TITLE_${key}`)}
          </AccordionSummary>
          <AccordionDetails classes={{ root: 'text-sm text-white/80 bg-shark bg-none lg:text-base' }}>
            {t.rich(`HOW_IT_WORKS_FAQ_DESCRIPTION_${key}`, {
              provision: `${CUMULATIVE_PERCENTAGE_FEE * 100}% + ${STRIPE_FIXED_FEE_PLN} ${currency}`,
              examplePrice: `${EXAMPLE_PRICE_IN_PLN} ${currency}`,
              exampleProvision: `${CUMULATIVE_PERCENTAGE_FEE * 100}% x ${EXAMPLE_PRICE_IN_PLN} ${currency} - ${STRIPE_FIXED_FEE_PLN} ${currency} = ${STRIPE_EXAMPLE_FEE_PLN} ${t('CURRENCY_PLN')}`,
              endEarnings: `${EXAMPLE_PRICE_IN_PLN} ${currency} - ${STRIPE_EXAMPLE_FEE_PLN} ${currency}  = ${EXAMPLE_PRICE_IN_PLN - STRIPE_EXAMPLE_FEE_PLN} ${currency}`,
            })}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FAQ;
