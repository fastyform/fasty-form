'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTranslations } from 'next-intl';
import prettyBytes from 'pretty-bytes';
import { twMerge } from 'tailwind-merge';
import ErrorIcon from '@/assets/error-icon';

const MAX_FILE_SIZE_IN_BYTES = 1000 * 1000 * 100 * 2; // 200 MB\
export const ALLOWED_FORMATS = ['.mp4', '.webm', '.qt', '.mov'].join(', ');
const ERROR_CODES = ['file-invalid-type', 'file-too-large'] as const;

const isAllowedErrorCode = (code: string): code is (typeof ERROR_CODES)[number] => ERROR_CODES.includes(code);

interface Props {
  onFileSet: Dispatch<SetStateAction<File | null>>;
}

const MAX_VIDEO_DURATION_IN_SECONDS = 60;

const VideoFileInput = ({ onFileSet }: Props) => {
  const t = useTranslations();
  const [fileInputErrors, setFileInputErrors] = useState<string[]>([]);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    maxSize: MAX_FILE_SIZE_IN_BYTES,
    multiple: false,
    accept: {
      'video/mp4': ['.mp4'],
      'video/webm': ['.webm'],
      'video/quicktime': ['.mov', '.qt'],
    },
    onDropAccepted: async ([acceptedFile]) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = URL.createObjectURL(acceptedFile);

      const duration = await new Promise<number>((resolve) => {
        video.onloadedmetadata = () => resolve(video.duration);
      });

      if (duration > MAX_VIDEO_DURATION_IN_SECONDS) {
        setFileInputErrors([t('SUBMISSION_REQUIREMENTS_VIDEO_INPUT_ERROR_VIDEO_DURATION_TOO_LONG')]);

        return;
      }

      onFileSet(acceptedFile);
    },
    onDrop: () => setFileInputErrors([]),
    onDropRejected: ([rejectedFile]) => {
      const errorMessages = rejectedFile.errors
        .map((error) =>
          isAllowedErrorCode(error.code)
            ? t(`SUBMISSION_REQUIREMENTS_VIDEO_INPUT_ERROR_${error.code}`, {
                fileSize: prettyBytes(MAX_FILE_SIZE_IN_BYTES),
                formats: ALLOWED_FORMATS,
              })
            : null,
        )
        .filter(Boolean);
      setFileInputErrors(errorMessages);
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div
          {...getRootProps({
            className: twMerge(
              'flex h-36 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-yellow-400 bg-shark dropzone gap-2.5 text-sm transition-colors p-2',
              isFocused && 'border-yellow-100',
              isDragAccept && 'border-green-400',
              isDragReject && 'border-red-400',
            ),
          })}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon
            fontSize="large"
            className={twMerge(
              'fill-yellow-400',
              isFocused && 'fill-yellow-100',
              isDragAccept && 'fill-green-400',
              isDragReject && 'fill-red-400',
            )}
          />
          <span
            className={twMerge(
              'text-center text-yellow-400',
              isFocused && 'text-yellow-100',
              isDragAccept && 'text-green-400',
              isDragReject && 'text-red-400',
            )}
          >
            <span className="hidden md:block">{t('SUBMISSION_REQUIREMENTS_VIDEO_INPUT_TEXT_DESKTOP')}</span>
            <span className="md:hidden">{t('SUBMISSION_REQUIREMENTS_VIDEO_INPUT_TEXT')}</span>
          </span>
        </div>
        {fileInputErrors.map((error) => (
          <p key={error} className="flex items-center gap-2 text-red-400">
            <ErrorIcon /> {error}
          </p>
        ))}
      </div>
      <ul className="flex list-inside list-disc flex-col gap-2 text-xs text-white">
        {(['0', '1', '2', '3', '4'] as const).map((index) => (
          <li key={index}>
            {t.rich(`SUBMISSION_REQUIREMENTS_VIDEO_INPUT_INSTRUCTION_${index}`, {
              fileSize: prettyBytes(MAX_FILE_SIZE_IN_BYTES),
              formats: ALLOWED_FORMATS,
              maxDuration: MAX_VIDEO_DURATION_IN_SECONDS,
              hd: '720p',
              fullHd: '1080p',
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoFileInput;
