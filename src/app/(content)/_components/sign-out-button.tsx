'use client';

import signOut from '@/app/(content)/_actions/sign-out';
import AppButton from '@/components/app-button';

const SignOutButton = () => {
  const handleSignOut = async () => {
    console.log('start');
    await signOut();
    console.log('end');
  };

  return <AppButton onClick={handleSignOut}>Wyloguj się</AppButton>;
};

export default SignOutButton;
