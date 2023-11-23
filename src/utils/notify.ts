'use client';

import { toast } from 'react-toastify';
import ErrorIcon from '@/assets/error-icon';

const notify = {
  error: (message: string) => {
    toast.error(message, {
      theme: 'dark',
      progressClassName: 'bg-red-400',
      bodyClassName: '[&_svg]:h-5 [&_svg]:w-5',
      icon: ErrorIcon,
    });
  },
};

export default notify;
