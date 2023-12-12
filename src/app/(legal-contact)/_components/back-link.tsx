'use client';

import { Button } from '@mui/base';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter, useSearchParams } from 'next/navigation';

const BackLink = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldNavigateBackParam = searchParams.get('should-navigate-back');

  const handleNavigation = () => {
    if (shouldNavigateBackParam) return router.back();

    return router.push('/login');
  };

  return (
    <Button
      className="flex items-center gap-2.5 text-sm transition-opacity hover:opacity-80"
      onClick={handleNavigation}
    >
      <ArrowBackIcon />
      Powrót
    </Button>
  );
};

export default BackLink;
