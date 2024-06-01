'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import prettyBytes from 'pretty-bytes';
import { twMerge } from 'tailwind-merge';
import readFile from '@/app/[locale]/(content)/trainers/[slug]/_components/edit-profile/_utils/read-files';
import AppButton from '@/components/app-button';
import notify from '@/utils/notify';
import CropperDialog from './cropper-dialog';

const MAX_FILE_SIZE = 20000000;
const ERROR_MESSAGES = ['file-invalid-type', 'file-too-large', 'too-many-files'] as const;
const ACCEPTED_FILE_EXTENSIONS = '.jgp, .jpeg, .png, .webp';

interface FileUploadInputProps {
  setImageBlob: Dispatch<SetStateAction<Blob | null>>;
  imageBlob: Blob | null;
  profileImageUrl: string | null;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
  isDeleting: boolean;
}

const FileUploadInput = ({
  setImageBlob,
  imageBlob,
  profileImageUrl,
  setIsDeleting,
  isDeleting,
}: FileUploadInputProps) => {
  const t = useTranslations();
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
      filesRejected[0].errors.forEach((error) => {
        if (ERROR_MESSAGES.includes(error.code)) {
          notify.error(
            t(`TRAINERS_EDIT_PROFILE_IMAGE_INPUT_ERROR_${error.code as (typeof ERROR_MESSAGES)[number]}` as const, {
              fileExtensions: ACCEPTED_FILE_EXTENSIONS,
              maxSize: prettyBytes(MAX_FILE_SIZE),
            }),
          );
        }
      });
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
              'hidden h-36 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-yellow-400 bg-shark',
              shouldInputBeVisible && 'flex',
              'dropzone',
            ),
          ),
        })}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon className="fill-yellow-400" fontSize="large" />
        <span className=" text-yellow-400">{t('TRAINERS_EDIT_PROFILE_IMAGE_UPLOAD')}</span>
      </div>

      {!shouldInputBeVisible && (
        <>
          <div className="flex flex-wrap">
            <AppButton classes={{ root: 'py-2' }} className="text-sm" onClick={open}>
              {t('COMMON_CHANGE')}
            </AppButton>
            <AppButton
              classes={{ contained: 'bg-transparent', root: 'py-2' }}
              className="text-sm text-white"
              onClick={() => {
                setIsDeleting(true);
                setFile('');
                setImageBlob(null);
              }}
            >
              {t('COMMON_DELETE')}
            </AppButton>
          </div>
          <div className="relative aspect-square h-36">
            <Image
              fill
              alt={t('TRAINERS_EDIT_PROFILE_IMAGE_LABEL')}
              className="rounded-full"
              src={(blobUrl || profileImageUrl)!}
            />
          </div>
        </>
      )}
    </>
  );
};

export default FileUploadInput;
