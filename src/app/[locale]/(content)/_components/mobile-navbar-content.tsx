import { ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { useTranslations } from 'next-intl';
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

interface MobileNavbarContentProps {
  trainerDetails: false | TrainerDetails | null;
  user: User | null;
}

const MobileNavbarContent = ({ trainerDetails, user }: MobileNavbarContentProps) => {
  const t = useTranslations();

  return (
    <>
      <Hr />
      <NotLoggedInButtons user={user} />
      {user && (
        <>
          <MobileNavbarLink href="/submissions" icon="submissions">
            {t('NAV_SUBMISSIONS')}
          </MobileNavbarLink>
          {trainerDetails && (
            <MobileNavbarLink href="/payments" icon="payments">
              {t('NAV_PAYMENTS')}
            </MobileNavbarLink>
          )}
          {trainerDetails && trainerDetails.profile_slug && (
            <MobileNavbarLink href={`/trainers/${trainerDetails.profile_slug}`} icon="profile">
              {t('NAV_PROFILE')}
            </MobileNavbarLink>
          )}
          <MobileNavbarLink href="/settings" icon="settings">
            {t('NAV_SETTINGS')}
          </MobileNavbarLink>
          <Hr />
          <MobileNavbarLink className="text-xs font-medium" href="/contact">
            {t('NAV_SUPPORT')}
          </MobileNavbarLink>
          <NavbarLink className="mt-auto" href="/feedback" icon="submissions" variant="contained">
            {t('NAV_FEEDBACK')}
          </NavbarLink>
        </>
      )}
    </>
  );
};

export default MobileNavbarContent;
