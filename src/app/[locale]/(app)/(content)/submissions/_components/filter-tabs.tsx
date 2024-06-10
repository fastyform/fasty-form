'use client';

import { useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Tab, TabProps } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import createQueryString from '@/utils/create-query-string';
import { SearchParam } from '@/utils/types';

const FILTER_VALUES = ['all', 'reviewed', 'unreviewed'] as const;
type Filter = (typeof FILTER_VALUES)[number];

const CustomTab = (props: TabProps) => (
  <Tab
    classes={{ selected: '!text-black !bg-yellow-400' }}
    className="rounded-full bg-shark px-5 py-2.5 text-xs font-bold normal-case text-zinc-400 min-[400px]:text-sm min-[500px]:text-base sm:px-10 md:w-auto lg:transition-colors lg:hover:bg-yellow-400/70 lg:hover:text-black"
    {...props}
  />
);

const FilterTabs = ({
  defaultFilterParam,
  isTrainerAccount,
}: {
  defaultFilterParam: SearchParam;
  isTrainerAccount: boolean;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations();

  const defaultTabValue =
    typeof defaultFilterParam === 'string' && FILTER_VALUES.includes(defaultFilterParam)
      ? (defaultFilterParam as Filter)
      : 'all';
  const [value, setValue] = useState<Filter>(defaultTabValue || 'all');

  const handleChange = (_: unknown, newValue: Filter) => {
    router.replace(
      `?${createQueryString(
        [
          { name: 'filter', value: newValue, action: 'add' },
          { name: 'page', action: 'delete' },
        ],
        searchParams,
      )}`,
    );
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <TabList
        allowScrollButtonsMobile
        aria-label="Filtry"
        scrollButtons="auto"
        variant="scrollable"
        classes={{
          indicator: 'invisible',
          flexContainer: 'w-full md:gap-4 gap-3',
          scrollButtons: 'text-white p-0 m-0 [&_.MuiSvgIcon-root]:!text-4xl [&_.MuiSvgIcon-root]:!rounded-full',
        }}
        onChange={handleChange}
      >
        {(['all', 'unreviewed', 'reviewed'] as const).map((filter) => (
          <CustomTab key={filter} label={t(`SUBMISSIONS_${filter}`)} value={filter} />
        ))}
        {isTrainerAccount && <CustomTab label={t('SUBMISSIONS_paidout')} value="paidout" />}
      </TabList>
    </TabContext>
  );
};

export default FilterTabs;
