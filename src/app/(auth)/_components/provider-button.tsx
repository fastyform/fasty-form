import { ReactNode } from 'react';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';

interface ProviderButtonProps extends LoadingButtonProps {
  icon: ReactNode;
}

const ProviderButton = ({ icon, ...props }: ProviderButtonProps) => (
  <LoadingButton
    color="inherit"
    startIcon={icon}
    classes={{
      root: 'bg-[#1E2226] text-white py-[18px] text-base rounded-full tracking-normal normal-case transition-opacity hover:opacity-80',
    }}
    {...props}
    disableElevation
  />
);

export default ProviderButton;
