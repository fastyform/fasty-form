'use client';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslations } from 'next-intl';
import actionSignOut from '@/app/[locale]/(content)/_actions/action-sign-out';
import AppButton from '@/components/app-button';

const SignOutButton = () => {
  const t = useTranslations();
  const handleSignOut = async () => {
    await actionSignOut();
  };

  return (
    <AppButton
      endIcon={<ArrowForwardIosIcon className="w-4 fill-white lg:hidden" />}
      startIcon={<LogoutIcon className="w-8 fill-yellow-400" />}
      classes={{
        root: 'p-0 py-5 font-normal rounded-none w-full items-start gap-2.5 text-left',
        contained: 'bg-transparent text-white',
      }}
      onClick={handleSignOut}
    >
      <div className="flex grow flex-col gap-1">
        <h5 className="text-base font-bold leading-4">{t('SETTINGS_MENU_TITLE_LOGOUT')}</h5>
        <span className="text-sm">{t('SETTINGS_MENU_DESCRIPTION_LOGOUT')}</span>
      </div>
    </AppButton>
  );
};

export default SignOutButton;
