import { NextResponse } from 'next/server';
import getSupabase from '@/utils/supabase/get-supabase';

export const middleware = async () => {
  const supabase = getSupabase();
  const res = await supabase.auth.getSession();
  console.log(res);
  console.log('middleware');

  return NextResponse.next();
};

export default middleware;
