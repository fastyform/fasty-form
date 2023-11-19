import { twMerge } from 'tailwind-merge';
import ErrorIcon from '@/assets/error-icon';
import { FormState } from '@/utils/form';

interface Props {
  state: FormState;
}

const AppFormState = ({ state }: Props) => (
  <>
    {state.message && (
      <span
        className={twMerge('inline-flex items-center gap-2 text-sm text-red-400', state.isSuccess && 'text-green-400')}
      >
        {!state.isSuccess && <ErrorIcon className="min-w-[17px]" />}
        {state.message}
      </span>
    )}
  </>
);

export default AppFormState;
