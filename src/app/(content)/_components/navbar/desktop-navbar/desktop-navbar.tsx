import AppLogo from '@/components/app-logo';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';
import DesktopNavbarLink from './desktop-navbar-link';

const DesktopNavbar = async () => {
  const user = await getUserWithNull();
  const isTrainerAccount = user ? await checkIsTrainerAccount(user.id) : false;
  const trainerProfileSlug = user && isTrainerAccount && (await getTrainerDetailsById(user.id)).profile_slug;

  return (
    <header className="z-50 mt-10 hidden h-[86px] w-full max-w-screen-2xl items-center justify-between rounded-full border border-gray-600 bg-[#1E2226] px-10 lg:flex">
      <AppLogo />
      <div className="flex h-full items-center gap-10">
        <DesktopNavbarLink href="/submissions" icon="submissions">
          Zgłoszenia
        </DesktopNavbarLink>
        <DesktopNavbarLink href={`/settings/${isTrainerAccount ? 'payments' : 'update-password'}`} icon="settings">
          Ustawienia
        </DesktopNavbarLink>
        {trainerProfileSlug && (
          <DesktopNavbarLink href={`/trainers/${trainerProfileSlug}`} icon="profile">
            Profil
          </DesktopNavbarLink>
        )}
      </div>
    </header>
  );
};

export default DesktopNavbar;
