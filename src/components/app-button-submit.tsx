import { useFormStatus } from 'react-dom';
import { LoadingButtonProps } from '@mui/lab/LoadingButton';
import AppButton from './app-button';

interface Props extends LoadingButtonProps {
  isValid: boolean;
}

const AppButtonSubmit = ({ isValid, ...props }: Props) => {
  const { pending } = useFormStatus();

  return <AppButton loading={pending && isValid} type="submit" {...props} />;
};

export default AppButtonSubmit;
