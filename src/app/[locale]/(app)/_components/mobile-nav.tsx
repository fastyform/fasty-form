import NavbarContent from './navbar-content';

const MobileNav = () => (
  <nav className="flex items-center justify-around gap-5 border-t border-solid border-gray-600 bg-shark px-5 lg:hidden [&_a]:py-1.5">
    <NavbarContent />
  </nav>
);

export default MobileNav;
