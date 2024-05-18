import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Locale } from '@/utils/constants';
import getLoggedInUser from '@/utils/get-logged-in-user';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import NotificationsForm from './notifications-form';

const NotificationsPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);

  const t = await getTranslations();
  const supabase = getSupabaseServerClient();

  const user = await getLoggedInUser();
  const { data, error } = await supabase.from('user_data').select('marketing_consent').eq('user_id', user.id).single();

  if (!data || error) {
    return t('COMMON_ERROR');
  }

  return (
    <>
      <h1 className="text-2xl text-white">{t('SETTINGS_NOTIFICATIONS_TITLE')}</h1>
      <p className="text-white">{t('SETTINGS_NOTIFICATIONS_DESCRIPTION')}</p>
      <NotificationsForm key={`${data.marketing_consent}`} defaultValue={data.marketing_consent}>
        <div className="flex flex-col gap-2 text-sm text-white" color="pink">
          <span>{t('SETTINGS_NOTIFICATIONS_CAPTION')}</span>
          <ul className="list-inside list-disc">
            {(['0', '1', '2'] as const).map((bullet) => (
              <li key={bullet}>{t(`SETTINGS_NOTIFICATIONS_BULLET_${bullet}`)}</li>
            ))}
          </ul>
        </div>
      </NotificationsForm>
    </>
  );
};

export default NotificationsPage;
