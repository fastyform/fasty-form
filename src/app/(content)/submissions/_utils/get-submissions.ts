import { getSupabaseServerComponentClient } from '@/utils/supabase/client';
import { Database } from '@/utils/supabase/supabase';
import { SearchParams } from '@/utils/types';

export const SUBMISSIONS_PAGE_SIZE = 12;
const ALLOWED_FILTERS: Database['public']['Enums']['status'][] = ['paid', 'reviewed', 'paidout', 'unreviewed'];

const getSubmissions = async (searchParams: SearchParams, isTrainerAccount: boolean) => {
  const supabase = getSupabaseServerComponentClient();

  const currentPage = Number(searchParams.page) - 1 || 0;
  const range = {
    start: currentPage * SUBMISSIONS_PAGE_SIZE,
    end: (currentPage + 1) * SUBMISSIONS_PAGE_SIZE - 1,
  };

  let submissionsQuery = supabase
    .from(isTrainerAccount ? 'ordered_submissions_trainer' : 'ordered_submissions_client')
    .select('id, status, video_key, trainers_details (profile_name)')
    .range(range.start, range.end);

  let submissionsCountQuery = supabase
    .from(isTrainerAccount ? 'ordered_submissions_trainer' : 'ordered_submissions_client')
    .select('*', { count: 'exact', head: true });

  if (typeof searchParams.filter === 'string' && ALLOWED_FILTERS.includes(searchParams.filter)) {
    const status =
      !isTrainerAccount && searchParams.filter === 'reviewed' ? '("reviewed","paidout")' : `(${searchParams.filter})`;

    submissionsQuery = submissionsQuery.filter('status', 'in', status);
    submissionsCountQuery = submissionsCountQuery.filter('status', 'in', status);
  }

  const submissions = await submissionsQuery;
  const submissionsCount = await submissionsCountQuery;

  return {
    submissions,
    submissionsCount,
  };
};

export default getSubmissions;
