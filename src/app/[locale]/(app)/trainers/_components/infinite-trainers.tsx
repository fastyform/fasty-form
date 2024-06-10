'use client';

import InfiniteScroll from 'react-infinite-scroll-component';
import { createBrowserClient } from '@supabase/ssr';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Database } from '@/utils/supabase/supabase';
import TrainerCard, { TrainerCardDetails, TrainerCardsSkeleton } from './trainer-card';

const TRAINERS_PAGE_COUNT = 18;

const getTrainers = async (page: number, seed: string, sortParam: string | null) => {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const from = page * TRAINERS_PAGE_COUNT;
  const to = from + TRAINERS_PAGE_COUNT - 1;

  const { data, error } = await supabase.rpc('fetch_trainers', {
    start: from,
    stop: to,
    seed,
    order_by: sortParam && sortParam !== 'null' ? 'service_price_in_grosz' : undefined,
    order_dir: sortParam && sortParam !== 'null' ? sortParam : undefined,
  });

  if (error) throw new Error();

  return data;
};

const InfiniteTrainers = ({ trainers, seed }: { trainers: TrainerCardDetails[]; seed: string }) => {
  const sortParam = useSearchParams().get('sort');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['trainers', { sortParam }],
    queryFn: ({ pageParam }) => getTrainers(pageParam, seed, sortParam),
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.length < TRAINERS_PAGE_COUNT ? undefined : lastPageParam + 1,
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    initialData: { pages: [trainers], pageParams: [1] },
    enabled: false,
  });

  const allTrainers = data?.pages.flat();

  return (
    <InfiniteScroll
      className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      dataLength={allTrainers.length}
      hasMore={hasNextPage}
      loader={null}
      next={fetchNextPage}
      scrollableTarget="scrollable"
    >
      {allTrainers.map((trainer) => (
        <TrainerCard key={trainer.user_id} trainer={trainer} />
      ))}

      {isFetchingNextPage && [...Array(6).keys()].map((key) => <TrainerCardsSkeleton key={key} />)}
    </InfiniteScroll>
  );
};
export default InfiniteTrainers;
