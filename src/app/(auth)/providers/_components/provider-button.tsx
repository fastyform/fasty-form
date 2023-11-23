import { ReactNode } from 'react';
import { LoadingButtonProps } from '@mui/lab';
import AppButton from '@/components/app-button';

interface ProviderButtonProps extends LoadingButtonProps {
  icon: ReactNode;
}

const ProviderButton = ({ icon, ...props }: ProviderButtonProps) => (
  <AppButton
    startIcon={props.loading ? undefined : icon}
    classes={{
      root: 'bg-[#1E2226] font-normal text-white py-[18px] text-base rounded-full tracking-normal normal-case transition-opacity hover:opacity-80',
    }}
    {...props}
  />
);

export default ProviderButton;
