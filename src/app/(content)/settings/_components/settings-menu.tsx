'use client';

import { SvgIconComponent } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GavelIcon from '@mui/icons-material/Gavel';
import PasswordIcon from '@mui/icons-material/Password';
import PaymentsIcon from '@mui/icons-material/Payments';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import AppButton from '@/components/app-button';
import SignOutButton from './sign-out-button';

type MenuItem = [string, string, SvgIconComponent, string];

const settingsMenuData: MenuItem[] = [
  ['Zarobki', 'Sprawdź swoje saldo.', PaymentsIcon, 'payments'],
  ['Hasło', 'Zmień swoje hasło.', PasswordIcon, 'update-password'],
  ['Wsparcie', 'Skontaktuj się z obsługą klienta', SupportAgentIcon, 'support'],
  ['Dokumenty Prawne', 'Przeczytaj nasze dokumenty', GavelIcon, 'legal'],
];

const SettingsMenu = ({ isTrainerAccount }: { isTrainerAccount: boolean }) => {
  const active = useSelectedLayoutSegment();

  return (
    <div className="flex flex-col">
      {settingsMenuData.map(([title, description, Icon, settingLink]) => {
        if (settingLink === 'payments' && !isTrainerAccount) return;

        return (
          <AppButton
            key={title}
            endIcon={<ArrowForwardIosIcon className="w-4 fill-white lg:hidden" />}
            href={`/settings/${settingLink}`}
            LinkComponent={Link}
            startIcon={<Icon className="w-8 fill-yellow-400" />}
            classes={{
              root: twMerge(
                'text-white p-0 py-5 font-normal rounded-none w-full items-start gap-2.5 bg-transparent border-b-[1px] border-b-[1px] border-gray-600 border-solid last:border-none',
                active === settingLink && 'text-yellow-400',
              ),
            }}
          >
            <div className="flex grow flex-col gap-1">
              <h5 className="text-base font-bold leading-4">{title}</h5>
              <span className="text-sm">{description}</span>
            </div>
          </AppButton>
        );
      })}
      <SignOutButton />
    </div>
  );
};

export default SettingsMenu;
