'use client';

import { ArrowForwardIos, Gavel, NotificationsActiveRounded, SupportAgent } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import SignOutButton from './sign-out-button';

const settingsMenuData = [
  [PersonIcon, 'account'],
  [SupportAgent, 'support'],
  [Gavel, 'legal'],
  [NotificationsActiveRounded, 'notifications'],
] as const;

const SettingsMenu = () => {
  const t = useTranslations();
  const active = useSelectedLayoutSegment();

  return (
    <div className="flex flex-col">
      {settingsMenuData.map(([Icon, settingPath]) => (
        <Button
          key={settingPath}
          disableElevation
          endIcon={<ArrowForwardIos className="w-4 fill-white lg:hidden" />}
          href={`/settings/${settingPath}`}
          LinkComponent={Link}
          startIcon={<Icon className="w-8 fill-yellow-400" />}
          classes={{
            root: twMerge(
              'text-base tracking-normal normal-case transition-opacity hover:opacity-80 transition-colors px-0 py-5 font-normal rounded-none w-full items-start gap-2.5 bg-transparent text-white border-b border-gray-600 border-solid last:border-none',
              active === settingPath && 'text-yellow-400',
            ),
          }}
        >
          <div className="flex grow flex-col items-start gap-1">
            <h5 className="text-base font-bold leading-4">{t(`SETTINGS_MENU_TITLE_${settingPath}`)}</h5>
            <span className="text-sm">{t(`SETTINGS_MENU_DESCRIPTION_${settingPath}`)}</span>
          </div>
        </Button>
      ))}
      <SignOutButton />
    </div>
  );
};

export default SettingsMenu;
