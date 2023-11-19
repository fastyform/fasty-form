import { SvgIconComponent } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EmailIcon from '@mui/icons-material/Email';
import GavelIcon from '@mui/icons-material/Gavel';
import LockIcon from '@mui/icons-material/Lock';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Link from 'next/link';
import AppButton from '@/components/app-button';
import SignOutButton from './_components/sign-out-button';

type MenuArrayItem = [string, string, SvgIconComponent, string];

const settingsMenuData: MenuArrayItem[] = [
  ['Email', 'Zresetuj adres email', EmailIcon, 'reset-email'],
  ['Hasło', 'Zresetuj swoje hasło', LockIcon, 'reset-password'],
  ['Wsparcie', 'Skontaktuj się z obsługą klienta', SupportAgentIcon, 'support'],
  ['Regulamin', 'Przeczytaj nasze warunki użytkowania', GavelIcon, 'terms-of-service'],
];

const SettingsPage = async () => (
  <>
    <h1 className="text-2xl text-white">Ustawienia</h1>
    <div className="flex flex-col">
      {settingsMenuData.map(([title, description, Icon, settingLink]) => (
        <AppButton
          key={title}
          endIcon={<ArrowForwardIosIcon className="w-4 fill-white" />}
          href={`/settings/${settingLink}`}
          LinkComponent={Link}
          startIcon={<Icon className="w-8 fill-yellow-400" />}
          classes={{
            root: 'text-white p-0 py-5 font-normal rounded-none w-full items-start gap-2.5 bg-transparent border-b-[1px] border-zinc-600 border-solid last:border-none',
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
  </>
);

export default SettingsPage;
