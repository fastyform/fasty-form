'use server';

import { Locale } from './constants';
import getUserWithNull from './get-user-with-null';
import { getSupabaseServerClient } from './supabase/client';

const actionChangeLanguage = async (locale: Locale) => {
  const supabase = getSupabaseServerClient();

  const user = await getUserWithNull();
  const isLoggedIn = !!user;

  if (!isLoggedIn) {
    return locale;
  }

  const { error } = await supabase.from('roles').update({ locale }).eq('user_id', user.id);
  if (error) {
    throw new Error(error.message);
  }

  return locale;
};

export default actionChangeLanguage;
