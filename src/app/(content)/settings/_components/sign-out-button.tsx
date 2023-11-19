'use client';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LogoutIcon from '@mui/icons-material/Logout';
import signOut from '@/app/(content)/_actions/sign-out';
import AppButton from '@/components/app-button';

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <AppButton
      endIcon={<ArrowForwardIosIcon className="w-4 fill-white" />}
      startIcon={<LogoutIcon className="w-8 fill-yellow-400" />}
      classes={{
        root: 'text-white p-0 py-5 font-normal rounded-none w-full items-start gap-2.5 bg-transparent border-b-[1px] border-zinc-600 border-solid last:border-none text-left',
      }}
      onClick={handleSignOut}
    >
      <div className="flex grow flex-col gap-1">
        <h5 className="text-base font-bold leading-4">Wyloguj się</h5>
        <span className="text-sm">Będziemy tęsknić</span>
      </div>
    </AppButton>
  );
};

export default SignOutButton;
