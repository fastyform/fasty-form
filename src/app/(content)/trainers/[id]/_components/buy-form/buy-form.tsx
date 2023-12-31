'use client';

import { ButtonHTMLAttributes, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { formDefaultState } from '@/utils/form';
import notify from '@/utils/notify';
import actionRedirectToCheckout from './_actions/action-redirect-to-checkout';
import LoadingIcon from './_assets/loading-icon';

const ButtonChildren = ({ pending, disabled }: { pending: boolean; disabled: boolean }) => {
  if (pending) {
    return (
      <div className="relative">
        <span className="invisible">Kup analizę techniki</span>
        <div className="absolute left-1/2 top-1/2 w-16 -translate-x-1/2 -translate-y-1/2">
          <LoadingIcon className="animate-spin fill-[#38404b]" />
        </div>
      </div>
    );
  }

  return disabled ? 'Brak możliwości kupna jako trener' : 'Kup analizę techniki';
};

const SubmitButton = ({ disabled, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type="submit"
      className={twMerge(
        'flex w-full max-w-sm items-center justify-center rounded-full bg-yellow-400 px-[30px] py-[18px] text-base font-bold normal-case tracking-normal text-[#0D1116] transition-opacity hover:opacity-80',
        (pending || disabled) && 'pointer-events-none bg-gray-600',
        disabled && '!text-white/60',
      )}
    >
      <ButtonChildren disabled={!!disabled} pending={pending} />
    </button>
  );
};

const BuyForm = ({
  trainerProfileSlug,
  isTrainerAccount,
}: {
  trainerProfileSlug: string;
  isTrainerAccount: boolean;
}) => {
  const [state, formAction] = useFormState(actionRedirectToCheckout, formDefaultState);

  useEffect(() => {
    if (!state) return;

    if (!state?.isSuccess && state?.message) {
      notify.error(state.message);
    }
  }, [state, state?.isSuccess, state?.message]);

  return (
    <form action={() => formAction({ trainerProfileSlug, isTrainerAccount })} className="w-full max-w-sm">
      <SubmitButton disabled={isTrainerAccount} />
    </form>
  );
};

export default BuyForm;
