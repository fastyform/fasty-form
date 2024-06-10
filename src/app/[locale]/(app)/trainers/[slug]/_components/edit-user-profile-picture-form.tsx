'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import prettyBytes from 'pretty-bytes';
import { twMerge } from 'tailwind-merge';
import { FormContainer } from '@/app/[locale]/(app)/trainers/[slug]/_components/edit-profile-form-components';
import readFile from '@/app/[locale]/(app)/trainers/[slug]/_utils/read-files';
import { actionEditProfilePicture } from '@/app/[locale]/(app)/trainers/[slug]/actions';
import AppButton from '@/components/app-button';
import notify from '@/utils/notify';
import CropperDialog from './cropper-dialog';

const MAX_FILE_SIZE = 20000000;
const ERROR_MESSAGES = ['file-invalid-type', 'file-too-large', 'too-many-files'] as const;
const ACCEPTED_FILE_EXTENSIONS = '.jgp, .jpeg, .png, .webp';

interface EditUserProfileImageProps {
  profileImageUrl: string | null;
  trainerProfileSlug: string;
}

const EditUserProfilePictureForm = ({ trainerProfileSlug, profileImageUrl }: EditUserProfileImageProps) => {
  const t = useTranslations();

  const [isDeleting, setIsDeleting] = useState(false);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  const editProfilePictureMutation = useMutation({
    mutationFn: async () => {
      let imageBlobFormData = null;
      if (imageBlob) {
        imageBlobFormData = new FormData();
        imageBlobFormData.set('image', imageBlob);
      }
      await actionEditProfilePicture({ imageBlobData: imageBlobFormData, isDeleting, trainerProfileSlug });
    },
    onSuccess: () => notify.success(t('COMMON_CHANGES_SAVED')),
    onError: () => notify.error(t('TRAINERS_EDIT_PROFILE_ERROR_SAVE')),
  });

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
    <FormContainer className="items-center">
      <span className="mr-auto text-white">{t('TRAINERS_EDIT_PROFILE_IMAGE_LABEL')}</span>
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
            <AppButton size="small" onClick={open}>
              {t('COMMON_CHANGE')}
            </AppButton>
            <AppButton
              color="secondary"
              size="small"
              variant="text"
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
      <AppButton
        className="self-end"
        loading={editProfilePictureMutation.isPending}
        variant="text"
        onClick={() => editProfilePictureMutation.mutate()}
      >
        {t('COMMON_SAVE')}
      </AppButton>
    </FormContainer>
  );
};

export default EditUserProfilePictureForm;
