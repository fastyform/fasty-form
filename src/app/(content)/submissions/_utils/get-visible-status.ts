import { Database } from '@/utils/supabase/supabase';

const getVisibleStatus = (submissionStatus: Database['public']['Enums']['status'], isTrainerAccount: boolean) => {
  if (isTrainerAccount) return submissionStatus;

  return submissionStatus === 'paidout' ? 'reviewed' : submissionStatus;
};

export default getVisibleStatus;
