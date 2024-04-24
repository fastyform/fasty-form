import { useTranslations } from 'next-intl';
import { Database } from './supabase/supabase';

export type SearchParams = { [key: string]: SearchParam };
export type SearchParam = string | string[] | undefined;

export type SubmissionStatus = Database['public']['Enums']['status'];

export type MessageKey = keyof IntlMessages;
export type IntlShape = ReturnType<typeof useTranslations>;
