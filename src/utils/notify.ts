'use client';

import { toast, ToastOptions } from 'react-toastify';
import ErrorIcon from '@/assets/error-icon';

const DEFAULT_PROPS: ToastOptions = {
  theme: 'dark',
  bodyClassName: '[&_svg]:h-5 [&_svg]:w-5',
};

const notify = {
  error: (message: string, toastOptions?: ToastOptions) =>
    toast.error(message, {
      ...DEFAULT_PROPS,
      progressClassName: 'bg-red-400',
      icon: ErrorIcon,
      ...toastOptions,
    }),
  success: (message: string, toastOptions?: ToastOptions) =>
    toast.success(message, {
      ...DEFAULT_PROPS,
      progressClassName: 'text-green-400',
      ...toastOptions,
    }),
} as const;

export default notify;
