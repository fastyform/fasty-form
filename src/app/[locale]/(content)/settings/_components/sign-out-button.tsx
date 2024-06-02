'use client';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import actionSignOut from '@/app/[locale]/(content)/_actions/action-sign-out';

const SignOutButton = () => {
  const t = useTranslations();
  const handleSignOut = async () => {
    await actionSignOut();
  };

  return (
    <Button
      disableElevation
      endIcon={<ArrowForwardIosIcon className="w-4 fill-white lg:hidden" />}
      startIcon={<LogoutIcon className="w-8 fill-yellow-400" />}
      classes={{
        root: 'text-base tracking-normal normal-case transition-opacity hover:opacity-80 transition-colors px-0 py-5 font-normal items-start rounded-none w-full gap-2.5 bg-transparent text-white border-b border-gray-600 border-solid last:border-none',
      }}
      onClick={handleSignOut}
    >
      <div className="flex grow flex-col items-start justify-start gap-1">
        <h5 className="text-base font-bold leading-4">{t('SETTINGS_MENU_TITLE_LOGOUT')}</h5>
        <span className="text-sm">{t('SETTINGS_MENU_DESCRIPTION_LOGOUT')}</span>
      </div>
    </Button>
  );
};

export default SignOutButton;
