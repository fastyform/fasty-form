import { LoadingButton, type LoadingButtonProps, LoadingButtonTypeMap } from '@mui/lab';
import { ButtonBaseProps } from '@mui/material';
import { twJoin, twMerge } from 'tailwind-merge';

type AppButtonProps = LoadingButtonProps<
  LoadingButtonTypeMap['defaultComponent'],
  { component?: ButtonBaseProps['component'] }
>;

const AppButtonNew = (props: AppButtonProps) => {
  const { classes, variant = 'contained', ...propsRest } = props;

  return (
    <LoadingButton
      disableElevation
      variant={variant}
      classes={{
        root: twMerge('text-base rounded-full px-[30px] tracking-normal normal-case font-bold', classes?.root),
        sizeMedium: 'py-2.5 [&_.MuiCircularProgress-root]:!size-5',
        sizeLarge: 'py-[18px] [&_.MuiCircularProgress-root]:!size-6',
        sizeSmall: 'py-2 text-sm',
        containedSecondary: twJoin(
          !propsRest.disabled && 'border border-solid border-gray-600 text-white bg-shark hover:bg-[#2d3339]',
        ),
        textSecondary: twJoin(!propsRest.disabled && 'text-white hover:bg-white/10'),
        disabled: '[&_svg]:fill-white/30',
      }}
      {...propsRest}
    />
  );
};

export default AppButtonNew;
