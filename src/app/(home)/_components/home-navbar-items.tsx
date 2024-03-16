import NotLoggedInButtons from '@/components/app-navbar/desktop-navbar/not-logged-in-buttons';
import NavbarLink from '@/components/app-navbar/navbar-link';
import getUserWithNull from '@/utils/get-user-with-null';

const HomeNavbarItems = async () => {
  const user = await getUserWithNull();

  return (
    <>
      <NotLoggedInButtons isHomePage user={user} />
      {user && (
        <NavbarLink href="/submissions" variant="contained">
          Aplikacja
        </NavbarLink>
      )}
    </>
  );
};

export default HomeNavbarItems;
