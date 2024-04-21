'use client';

import { ArrowForwardIos, Gavel, NotificationsActiveRounded, Password, SupportAgent } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import AppButton from '@/components/app-button';
import SignOutButton from './sign-out-button';

const settingsMenuData = [
  [Password, 'update-password'],
  [SupportAgent, 'support'],
  [Gavel, 'legal'],
  [NotificationsActiveRounded, 'notifications'],
  [PersonIcon, 'account'],
] as const;

const SettingsMenu = () => {
  const t = useTranslations();
  const active = useSelectedLayoutSegment();

  return (
    <div className="flex flex-col">
      {settingsMenuData.map(([Icon, settingPath]) => (
        <AppButton
          key={settingPath}
          endIcon={<ArrowForwardIos className="w-4 fill-white lg:hidden" />}
          href={`/settings/${settingPath}`}
          LinkComponent={Link}
          startIcon={<Icon className="w-8 fill-yellow-400" />}
          classes={{
            root: twMerge(
              'p-0 py-5 font-normal rounded-none w-full items-start gap-2.5',
              active === settingPath && 'text-white text-yellow-400',
            ),
            contained: 'bg-transparent text-white border-b-[1px] border-gray-600 border-solid last:border-none',
          }}
        >
          <div className="flex grow flex-col gap-1">
            <h5 className="text-base font-bold leading-4">{t(`SETTINGS_MENU_TITLE_${settingPath}`)}</h5>
            <span className="text-sm">{t(`SETTINGS_MENU_DESCRIPTION_${settingPath}`)}</span>
          </div>
        </AppButton>
      ))}
      <SignOutButton />
    </div>
  );
};

export default SettingsMenu;
