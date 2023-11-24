'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import AppButton from '@/components/app-button';
import notify from '@/utils/notify';
import CropperDialog from './_components/cropper-dialog';
import readFile from './_utils/read-files';

const MAX_FILE_SIZE = 20971520;
const ERROR_MESSAGES: { [key: string]: string } = {
  'file-invalid-type': 'Akceptowalne typy plików to: .jgp, .jpeg, .png, .webp',
  'file-too-large': 'Maksymalna wielkość pliku to 20MB.',
  'too-many-files': 'Maksymalnie jedno zdjęcie',
};

const FileUploadInput = ({
  setImageBlob,
  imageBlob,
  profileImageUrl,
  setIsDeleting,
  isDeleting,
}: {
  setImageBlob: Dispatch<SetStateAction<Blob | null>>;
  imageBlob: Blob | null;
  profileImageUrl: string | null;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
  isDeleting: boolean;
}) => {
  const [file, setFile] = useState<string>('');
  const { getRootProps, getInputProps, open } = useDropzone({
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    onDropRejected: (filesRejected) => {
      filesRejected[0].errors.map((error) => notify.error(ERROR_MESSAGES[error.code]));
    },
    onDropAccepted: async (filesAccepted) => {
      const imageDataUrl = await readFile(filesAccepted[0]);
      setFile(imageDataUrl);
    },
  });

  const blobUrl = imageBlob ? URL.createObjectURL(imageBlob) : undefined;
  const shouldInputBeVisible = (!imageBlob && !profileImageUrl) || isDeleting;

  return (
    <>
      <CropperDialog file={file} setFile={setFile} setImageBlob={setImageBlob} setIsDeleting={setIsDeleting} />
      <div
        {...getRootProps({
          className: twMerge(
            twMerge(
              'hidden h-36 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-yellow-400 bg-[#1E2226]',
              shouldInputBeVisible && 'flex',
              'dropzone',
            ),
          ),
        })}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon className="fill-yellow-400" fontSize="large" />
        <span className=" text-yellow-400">Wgraj zdjęcie </span>
      </div>

      {!shouldInputBeVisible && (
        <>
          <div className="flex flex-wrap">
            <AppButton classes={{ root: 'py-2' }} className="text-sm" onClick={open}>
              Zmień
            </AppButton>
            <AppButton
              classes={{ root: 'py-2 bg-transparent' }}
              className="text-sm text-white"
              onClick={() => {
                setIsDeleting(true);
                setFile('');
                setImageBlob(null);
              }}
            >
              Usuń
            </AppButton>
          </div>
          <div className="relative aspect-square h-36">
            <Image fill alt="Zdjęcie profilowe" className="rounded-full" src={(blobUrl || profileImageUrl)!} />
          </div>
        </>
      )}
    </>
  );
};

export default FileUploadInput;
