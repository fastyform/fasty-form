import AppLogo from '@/components/app-logo';
import { getUserIdFromSession, getUserRoleFromSession } from '@/utils/get-data-from-session';
import { getSupabaseServerComponentClient } from '@/utils/supabase/client';
import DesktopNavbarLink from './desktop-navbar-link';

const DesktopNavbar = async () => {
  const isTrainerAccount = (await getUserRoleFromSession()) === 'trainer';
  const userId = (await getUserIdFromSession()) || '';
  const supabase = getSupabaseServerComponentClient();
  const { data: trainerData } = await supabase.from('trainers_details').select('id').eq('user_id', userId).single();

  return (
    <header className="z-50 mt-10 hidden h-[86px] w-full max-w-screen-2xl items-center justify-between rounded-full border border-gray-600 bg-[#1E2226] px-10 lg:flex">
      <AppLogo />
      <div className="flex h-full items-center gap-10">
        <DesktopNavbarLink href="/submissions" icon="submissions">
          Zgłoszenia
        </DesktopNavbarLink>
        <DesktopNavbarLink href="/settings/support" icon="settings">
          Ustawienia
        </DesktopNavbarLink>
        {isTrainerAccount && (
          <DesktopNavbarLink href={`/trainers/${trainerData?.id}`} icon="profile">
            Profil
          </DesktopNavbarLink>
        )}
      </div>
    </header>
  );
};

export default DesktopNavbar;
