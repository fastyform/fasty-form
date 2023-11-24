import { useFormStatus } from 'react-dom';
import { LoadingButtonProps } from '@mui/lab';
import AppButton from './app-button';

interface Props extends LoadingButtonProps {
  isValid: boolean;
}

const AppButtonSubmit = ({ isValid, ...props }: Props) => {
  const { pending } = useFormStatus();

  return <AppButton {...props} loading={pending && isValid} type="submit" />;
};

export default AppButtonSubmit;
