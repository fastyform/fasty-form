import { getTranslations } from 'next-intl/server';
import NotLoggedInButtons from '@/components/app-navbar/desktop-navbar/not-logged-in-buttons';
import NavbarLink from '@/components/app-navbar/navbar-link';
import Constants from '@/utils/constants';
import getUserWithNull from '@/utils/get-user-with-null';

const PublicNavbarItems = async () => {
  const user = await getUserWithNull();
  const t = await getTranslations();

  return (
    <>
      <NotLoggedInButtons isHomePage user={user} />
      {user && (
        <NavbarLink href="/submissions" variant="contained">
          {t('PUBLIC_NAVBAR_GO_TO_APP_BUTTON')} {Constants.APP_NAME}
        </NavbarLink>
      )}
    </>
  );
};

export default PublicNavbarItems;
