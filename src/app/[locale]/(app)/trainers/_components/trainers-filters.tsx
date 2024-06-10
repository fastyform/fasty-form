'use client';

import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import AppButton from '@/components/app-button';
import createQueryString from '@/utils/create-query-string';

const TrainersFilters = () => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const sort = searchParams.get('sort');

  const handleSort = (direction: 'ASC' | 'DESC') => {
    if (sort === direction) {
      router.replace(`?${createQueryString([{ name: 'sort', action: 'add', value: 'null' }], searchParams)}`, {
        scroll: false,
      });

      return;
    }
    router.replace(`?${createQueryString([{ name: 'sort', value: direction, action: 'add' }], searchParams)}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex flex-wrap gap-2.5">
      <AppButton
        className="w-fit"
        color={sort === 'ASC' ? 'primary' : 'secondary'}
        size="small"
        onClick={() => handleSort('ASC')}
      >
        <ArrowUpwardOutlinedIcon />
        {t('TRAINERS_DATABASE_FILTERS_PRICE')}
      </AppButton>
      <AppButton
        className="w-fit"
        color={sort === 'DESC' ? 'primary' : 'secondary'}
        size="small"
        onClick={() => handleSort('DESC')}
      >
        <ArrowDownwardOutlinedIcon />
        {t('TRAINERS_DATABASE_FILTERS_PRICE')}
      </AppButton>
    </div>
  );
};

export default TrainersFilters;
