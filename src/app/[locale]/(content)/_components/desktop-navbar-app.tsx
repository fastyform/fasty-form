import { getTranslations } from 'next-intl/server';
import AppLogo from '@/components/app-logo';
import NotLoggedInButtons from '@/components/app-navbar/desktop-navbar/not-logged-in-buttons';
import NavbarLink from '@/components/app-navbar/navbar-link';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';

const DesktopNavbarApp = async () => {
  const t = await getTranslations();
  const user = await getUserWithNull();
  const isTrainerAccount = user ? await checkIsTrainerAccount(user.id) : false;
  const trainerDetails = isTrainerAccount && user && (await getTrainerDetailsById(user.id));

  return (
    <header className="fixed left-0 top-0 z-50 hidden h-[68px] w-full items-center justify-center border-b border-gray-600 bg-shark lg:flex">
      <div className="flex w-full max-w-screen-2xl items-center justify-between lg:px-5">
        <AppLogo className="w-[100px]" />
        <div className="flex h-full items-center px-5">
          <NotLoggedInButtons user={user} />
          {user && (
            <>
              <NavbarLink href="/submissions" icon="submissions">
                {t('NAV_SUBMISSIONS')}
              </NavbarLink>
              {isTrainerAccount && (
                <NavbarLink href="/payments" icon="payments">
                  {t('NAV_PAYMENTS')}
                </NavbarLink>
              )}
              <NavbarLink href="/settings/account" icon="settings">
                {t('NAV_SETTINGS')}
              </NavbarLink>
              {trainerDetails && trainerDetails.profile_slug && (
                <NavbarLink href={`/trainers/${trainerDetails.profile_slug}`} icon="profile">
                  {t('NAV_PROFILE')}
                </NavbarLink>
              )}
              <NavbarLink className="ml-2" href="/feedback" icon="feedback" variant="contained">
                {t('NAV_FEEDBACK')}
              </NavbarLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default DesktopNavbarApp;
