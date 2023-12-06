'use client';

import { SyntheticEvent, useState } from 'react';
import { TabContext, TabList } from '@mui/lab';
import { Tab, TabProps } from '@mui/material';
import { Route } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import createQueryString from '@/utils/create-query-string';

const FILTER_VALUES = ['all', 'reviewed', 'unreviewed'] as const;
type Filter = (typeof FILTER_VALUES)[number];

const CustomTab = (props: TabProps) => (
  <Tab
    classes={{ selected: '!text-black !font-bold !bg-yellow-400' }}
    className="rounded-full bg-[#1E2226] px-5 py-2.5 text-xs font-normal normal-case text-zinc-400 min-[400px]:text-sm min-[500px]:text-base sm:px-10 md:w-auto lg:transition-colors lg:hover:bg-yellow-400 lg:hover:text-black"
    {...props}
  />
);

const FilterTabs = ({ defaultFilter }: { defaultFilter: string | string[] | undefined }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultTabValue =
    typeof defaultFilter === 'string' && FILTER_VALUES.includes(defaultFilter) ? (defaultFilter as Filter) : 'all';
  const [value, setValue] = useState<Filter>(defaultTabValue || 'all');

  const handleChange = (_: SyntheticEvent, newValue: Filter) => {
    router.replace(`?${createQueryString('filter', newValue, searchParams)}` as Route);
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
          flexContainer: 'w-full md:gap-10 gap-5',
          scrollButtons: 'text-white p-0 m-0 [&_.MuiSvgIcon-root]:!text-4xl [&_.MuiSvgIcon-root]:!rounded-full',
        }}
        onChange={handleChange}
      >
        <CustomTab label="Wszystkie" value="all" />
        <CustomTab label="Sprawdzone" value="reviewed" />
        <CustomTab label="Oczekujące" value="unreviewed" />
      </TabList>
    </TabContext>
  );
};

export default FilterTabs;
