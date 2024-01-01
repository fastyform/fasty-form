import { redirect } from 'next/navigation';

export const getResponse = (message: string, isSuccess = false) => ({ message, isSuccess });

export const removeFileExtension = (fileName: string) => fileName.split('.').slice(0, -1).join('.');

export const triggerRootNotFound = () => redirect('/not-found');
