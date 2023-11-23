'use client';

import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import AppButton from '@/components/app-button';
import CropperDialog from './_components/cropper-dialog';
import readFile from './_utils/read-files';

const MAX_FILE_SIZE = 2000000;
const ALLOWED_IMAGE_TYPES = '.jpg, .jpeg, .png, .gif, .bmp, .tiff, .webp';
// TODO dodac toast jezeli beda zly image size albo typ

const FileUploadInput = ({
  setImageBlob,
  imageBlob,
  profileImageUrl,
}: {
  setImageBlob: Dispatch<SetStateAction<Blob | null>>;
  imageBlob: Blob | null;
  profileImageUrl: string | null;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<string>('');

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files && e.target.files.length === 1) {
      const extension = e.target.files[0].name.split('.').at(-1);
      if (typeof extension !== 'string') return;

      if (!ALLOWED_IMAGE_TYPES.includes(extension)) {
        // TOAST ERROR
        return;
      }

      if (e.target.files[0].size > MAX_FILE_SIZE) {
        // TOAST ERROR

        return;
      }
      const imageDataUrl = await readFile(e.target.files[0]);
      setFile(imageDataUrl);
    }
  };

  const blobUrl = imageBlob ? URL.createObjectURL(imageBlob) : undefined;
  const shouldInputBeVisible = !imageBlob && !profileImageUrl;

  return (
    <>
      <CropperDialog file={file} setFile={setFile} setImageBlob={setImageBlob} />

      <label
        htmlFor="upload-profile-input"
        className={twMerge(
          'hidden h-36 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-yellow-400 bg-[#1E2226]',
          shouldInputBeVisible && 'flex',
        )}
      >
        <CloudUploadIcon className="fill-yellow-400" fontSize="large" />
        <span className=" text-yellow-400">Wgraj zdjęcie </span>
        <input
          ref={ref}
          accept={ALLOWED_IMAGE_TYPES}
          className="hidden"
          id="upload-profile-input"
          max={MAX_FILE_SIZE}
          type="file"
          onChange={handleFileChange}
        />
      </label>

      {(imageBlob || profileImageUrl) && (
        <>
          <div className="flex flex-wrap">
            <AppButton
              classes={{ root: 'py-2' }}
              className="text-sm"
              onClick={() => {
                if (ref.current) ref.current.click();
              }}
            >
              Zmień
            </AppButton>
            <AppButton classes={{ root: 'py-2 bg-transparent' }} className="text-sm text-white">
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
