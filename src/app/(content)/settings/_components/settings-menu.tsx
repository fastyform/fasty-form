'use client';

import {
  ArrowForwardIos,
  Gavel,
  NotificationsActiveRounded,
  Password,
  SupportAgent,
  SvgIconComponent,
} from '@mui/icons-material';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import AppButton from '@/components/app-button';
import SignOutButton from './sign-out-button';

type MenuItem = [string, string, SvgIconComponent, string];

const settingsMenuData: MenuItem[] = [
  ['Hasło', 'Zmień swoje hasło', Password, 'update-password'],
  ['Wsparcie', 'Skontaktuj się z nami', SupportAgent, 'support'],
  ['Dokumenty Prawne', 'Przeczytaj nasze dokumenty', Gavel, 'legal'],
  ['Powiadomienia', 'Włącz lub wyłącz powiadomienia', NotificationsActiveRounded, 'notifications'],
];

const SettingsMenu = () => {
  const active = useSelectedLayoutSegment();

  return (
    <div className="flex flex-col">
      {settingsMenuData.map(([title, description, Icon, settingLink]) => (
        <AppButton
          key={title}
          endIcon={<ArrowForwardIos className="w-4 fill-white lg:hidden" />}
          href={`/settings/${settingLink}`}
          LinkComponent={Link}
          startIcon={<Icon className="w-8 fill-yellow-400" />}
          classes={{
            root: twMerge(
              'p-0 py-5 font-normal rounded-none w-full items-start gap-2.5',
              active === settingLink && 'text-white text-yellow-400',
            ),
            contained: 'bg-transparent text-white border-b-[1px] border-gray-600 border-solid last:border-none',
          }}
        >
          <div className="flex grow flex-col gap-1">
            <h5 className="text-base font-bold leading-4">{title}</h5>
            <span className="text-sm">{description}</span>
          </div>
        </AppButton>
      ))}
      <SignOutButton />
    </div>
  );
};

export default SettingsMenu;
