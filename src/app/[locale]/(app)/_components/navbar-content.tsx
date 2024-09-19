import { getTranslations } from 'next-intl/server';
import NotLoggedInButtons from '@/components/app-navbar/desktop-navbar/not-logged-in-buttons';
import NavbarLink from '@/components/app-navbar/navbar-link';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';

const NavbarContent = async () => {
  const t = await getTranslations();

  const user = await getUserWithNull();
  const isTrainerAccount = user ? await checkIsTrainerAccount(user.id) : false;
  const trainerDetails = isTrainerAccount && user && (await getTrainerDetailsById(user.id));

  return (
    <>
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
          <NavbarLink
            href="/trainers"
            icon="trainers"
            trainerSlug={trainerDetails && trainerDetails.profile_slug ? trainerDetails.profile_slug : undefined}
          >
            {t('COMMON_TRAINER_DATABASE')}
          </NavbarLink>
          <NavbarLink className="hidden lg:flex" href="/settings/account" icon="settings">
            {t('NAV_SETTINGS')}
          </NavbarLink>
          <NavbarLink className="lg:hidden" href="/settings" icon="settings">
            {t('NAV_SETTINGS')}
          </NavbarLink>
          {trainerDetails && trainerDetails.profile_slug && (
            <NavbarLink href={`/trainers/${trainerDetails.profile_slug}`} icon="profile">
              {t('NAV_PROFILE')}
            </NavbarLink>
          )}
          <NavbarLink className="ml-2 hidden lg:flex" href="/feedback" icon="feedback" variant="contained">
            {t('NAV_FEEDBACK')}
          </NavbarLink>
        </>
      )}
    </>
  );
};

export default NavbarContent;
