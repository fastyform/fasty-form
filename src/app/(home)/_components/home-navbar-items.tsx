import DesktopNavbarLink from '@/app/(content)/_components/navbar/desktop-navbar/desktop-navbar-link';
import NotLoggedInButtons from '@/app/(content)/_components/navbar/desktop-navbar/not-logged-in-buttons';
import getUserWithNull from '@/utils/get-user-with-null';

const HomeNavbarItems = async () => {
  const user = await getUserWithNull();

  return (
    <>
      <NotLoggedInButtons user={user} />
      {user && (
        <DesktopNavbarLink href="/submissions" icon="submissions" variant="contained">
          Aplikacja
        </DesktopNavbarLink>
      )}
    </>
  );
};

export default HomeNavbarItems;
