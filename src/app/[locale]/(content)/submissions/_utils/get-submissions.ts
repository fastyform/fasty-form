import { getSupabaseServerComponentClient } from '@/utils/supabase/client';
import { Database } from '@/utils/supabase/supabase';
import { SearchParams } from '@/utils/types';

export const SUBMISSIONS_PAGE_SIZE = 12;
const ALLOWED_FILTERS: Database['public']['Enums']['status'][] = ['paid', 'reviewed', 'paidout', 'unreviewed'];

const getSubmissionsRange = (searchParams: SearchParams) => {
  const currentPage = Number(searchParams.page) - 1 || 0;
  const range = {
    start: currentPage * SUBMISSIONS_PAGE_SIZE,
    end: (currentPage + 1) * SUBMISSIONS_PAGE_SIZE - 1,
  };

  return range;
};

const getSubmissionQueries = (
  range: { start: number; end: number },
  submissionViewName: 'ordered_submissions_trainer' | 'ordered_submissions_client',
) => {
  const supabase = getSupabaseServerComponentClient();

  const submissionsQuery = supabase
    .from(submissionViewName)
    .select('id, status, video_key, trainers_details (profile_name)')
    .range(range.start, range.end);

  const submissionsCountQuery = supabase.from(submissionViewName).select('*', { count: 'exact', head: true });

  return { submissionsQuery, submissionsCountQuery };
};

export const getTrainerSubmissions = async (searchParams: SearchParams) => {
  const range = getSubmissionsRange(searchParams);
  let { submissionsQuery, submissionsCountQuery } = getSubmissionQueries(range, 'ordered_submissions_trainer');

  if (typeof searchParams.filter === 'string' && ALLOWED_FILTERS.includes(searchParams.filter)) {
    const status = searchParams.filter;

    submissionsQuery = submissionsQuery.filter('status', 'in', status);
    submissionsCountQuery = submissionsCountQuery.filter('status', 'in', status);
  }

  const [submissions, submissionsCount] = await Promise.all([submissionsQuery, submissionsCountQuery]);

  return { submissions, submissionsCount };
};

export const getClientSubmissions = async (searchParams: SearchParams) => {
  const range = getSubmissionsRange(searchParams);
  let { submissionsQuery, submissionsCountQuery } = getSubmissionQueries(range, 'ordered_submissions_client');

  if (typeof searchParams.filter === 'string' && ALLOWED_FILTERS.includes(searchParams.filter)) {
    const status = searchParams.filter === 'reviewed' ? '("reviewed","paidout")' : searchParams.filter;

    submissionsQuery = submissionsQuery.filter('status', 'in', status);
    submissionsCountQuery = submissionsCountQuery.filter('status', 'in', status);
  }

  const [submissions, submissionsCount] = await Promise.all([submissionsQuery, submissionsCountQuery]);

  return { submissions, submissionsCount };
};
