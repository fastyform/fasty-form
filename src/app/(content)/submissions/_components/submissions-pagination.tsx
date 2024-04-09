'use client';

import { Pagination } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import createQueryString from '@/utils/create-query-string';

const SubmissionsPagination = ({ submissionsCount }: { submissionsCount: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageParam = searchParams.get('page');

  const handlePaginationChange = (_: unknown, page: number) => {
    const newQueryParams = createQueryString([{ name: 'page', value: page.toString(), action: 'add' }], searchParams);
    router.replace(`?${newQueryParams}`);
  };

  return <Pagination count={submissionsCount} page={Number(pageParam) || 1} onChange={handlePaginationChange} />;
};

export default SubmissionsPagination;
