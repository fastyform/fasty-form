import Constants from '@/utils/constants';
import getUserFromSession from '@/utils/get-user-from-session';
import { getSupabaseServerComponentClient } from '@/utils/supabase/client';
import NotificationsForm from './notifications-form';

const NotificationsPage = async () => {
  const supabase = getSupabaseServerComponentClient();

  const user = await getUserFromSession();
  const { data, error } = await supabase.from('roles').select('marketing_consent').eq('user_id', user.id).single();

  if (!data || error) {
    return Constants.COMMON_ERROR_MESSAGE;
  }

  return (
    <>
      <h1 className="text-2xl text-white">Powiadomienia</h1>
      <p className="text-white">Korzystaj więcej, oszczędzaj i bądź na bieżąco!</p>
      <NotificationsForm key={`${data.marketing_consent}`} defaultValue={data.marketing_consent}>
        <div className="flex flex-col gap-2 text-sm text-white" color="pink">
          <span>Zaznaczając tę opcję, zgadzasz się na otrzymywanie:</span>
          <ul className="list-inside list-disc">
            {[
              'Porad i wskazówek do lepszego korzystania z aplikacji',
              'Promocji specjalnych, dzięki którym zaoszczędzisz',
              'Nowości o aktualizacjach i nowych funkcjach.',
            ].map((bulletPoint) => (
              <li key={bulletPoint}>{bulletPoint}</li>
            ))}
          </ul>
        </div>
      </NotificationsForm>
    </>
  );
};

export default NotificationsPage;
