import AppLogo from '@/components/app-logo';
import NotLoggedInButtons from '@/components/app-navbar/desktop-navbar/not-logged-in-buttons';
import NavbarLink from '@/components/app-navbar/navbar-link';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';

const DesktopNavbarApp = async () => {
  const user = await getUserWithNull();
  const isTrainerAccount = user ? await checkIsTrainerAccount(user.id) : false;
  const trainerDetails = isTrainerAccount && user && (await getTrainerDetailsById(user.id));

  return (
    <header className="z-50 hidden h-[68px] w-full items-center justify-center border-b border-gray-600 bg-shark lg:flex">
      <div className="flex w-full max-w-screen-2xl items-center justify-between lg:px-5">
        <AppLogo className="w-[100px]" />
        <div className="flex h-full items-center px-5">
          <NotLoggedInButtons user={user} />
          {user && (
            <>
              <NavbarLink href="/submissions" icon="submissions">
                Zgłoszenia
              </NavbarLink>
              <NavbarLink href={`/settings/${isTrainerAccount ? 'payments' : 'update-password'}`} icon="settings">
                Ustawienia
              </NavbarLink>
              {trainerDetails && trainerDetails.profile_slug && (
                <NavbarLink href={`/trainers/${trainerDetails.profile_slug}`} icon="profile">
                  Profil
                </NavbarLink>
              )}
              <NavbarLink className="ml-2" href="/settings/feedback" icon="feedback" variant="contained">
                Zostaw opinię
              </NavbarLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default DesktopNavbarApp;
