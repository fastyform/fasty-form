'use client';

import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useTranslations } from 'next-intl';

const FAQ_KEYS = ['one', 'two', 'three', 'four'] as const;
type FaqQuestion = (typeof FAQ_KEYS)[number];

const FaqAccordion = () => {
  const t = useTranslations();
  const [expanded, setExpanded] = useState<FaqQuestion | null>(null);

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
            {t(`HOW_IT_WORKS_FAQ_DESCRIPTION_${key}`)}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FaqAccordion;
