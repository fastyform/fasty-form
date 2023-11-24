'use client';

import { toast, ToastOptions } from 'react-toastify';
import ErrorIcon from '@/assets/error-icon';

const DEFAULT_PROPS: ToastOptions = {
  theme: 'dark',
  bodyClassName: '[&_svg]:h-5 [&_svg]:w-5',
};

const notify = {
  error: (message: string) => {
    toast.error(message, {
      ...DEFAULT_PROPS,
      progressClassName: 'bg-red-400',
      icon: ErrorIcon,
    });
  },
  success: (message: string) => {
    toast.success(message, {
      ...DEFAULT_PROPS,
      progressClassName: 'text-green-400',
    });
  },
};

export default notify;
