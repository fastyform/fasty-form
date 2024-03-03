import { redirect } from 'next/navigation';

export const getResponse = (message: string, isSuccess = false) => ({ message, isSuccess });

export const removeFileExtension = (fileName: string) => fileName.split('.').slice(0, -1).join('.');

export const triggerRootNotFound = () => redirect('/not-found');

export const ensureNotNull = <T>(param: T | undefined | null): T => {
  if (param === undefined || param === null) {
    throw new TypeError('This value was promised to be there.');
  }

  return param;
};
