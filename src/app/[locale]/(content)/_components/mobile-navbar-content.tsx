import { ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import navbarIcons from '@/components/app-navbar/assets/navbar-icons';
import NotLoggedInButtons from '@/components/app-navbar/desktop-navbar/not-logged-in-buttons';
import NavbarLink from '@/components/app-navbar/navbar-link';
import { TrainerDetails } from '@/utils/get-trainer-details-by-id';

const MobileNavbarLink = ({
  children,
  href,
  icon,
  className,
}: {
  children: ReactNode;
  href: string;
  icon?: keyof typeof navbarIcons;
  className?: ClassNameValue;
}) => (
  <NavbarLink disableRipple className={twMerge('w-fit', className)} href={href} icon={icon}>
    {children}
  </NavbarLink>
);

const Hr = () => <hr className="border-zinc-400/30" />;

const MobileNavbarContent = ({
  trainerDetails,
  user,
}: {
  trainerDetails: false | TrainerDetails | null;
  user: User | null;
}) => (
  <>
    <Hr />
    <NotLoggedInButtons user={user} />
    {user && (
      <>
        <MobileNavbarLink href="/submissions" icon="submissions">
          Zgłoszenia
        </MobileNavbarLink>
        {trainerDetails && (
          <MobileNavbarLink href="/payments" icon="payments">
            Płatności
          </MobileNavbarLink>
        )}
        {trainerDetails && trainerDetails.profile_slug && (
          <MobileNavbarLink href={`/trainers/${trainerDetails.profile_slug}`} icon="profile">
            Profil
          </MobileNavbarLink>
        )}
        <MobileNavbarLink href="/settings" icon="settings">
          Ustawienia
        </MobileNavbarLink>
        <Hr />
        <MobileNavbarLink className="text-xs font-medium" href="/contact">
          Wsparcie
        </MobileNavbarLink>
        <NavbarLink className="mt-auto" href="/feedback" icon="submissions" variant="contained">
          Zostaw opinię
        </NavbarLink>
      </>
    )}
  </>
);

export default MobileNavbarContent;
