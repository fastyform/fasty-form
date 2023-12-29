export const getResponse = (message: string, isSuccess = false) => ({ message, isSuccess });

export const removeFileExtension = (fileName: string) => fileName.split('.').slice(0, -1).join('.');
