'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { twMerge } from 'tailwind-merge';
import ErrorIcon from '@/assets/error-icon';

const MAX_FILE_SIZE_IN_BYTES = 104857600 * 2; // 200 MB

const ERROR_MESSAGES: { [key: string]: string } = {
  'file-invalid-type': 'Plik musi być plikiem wideo w formacie .mp4, .webm, .qt lub .mov.',
  'file-too-large': 'Maksymalny rozmiar pliku wideo to 200 MB.',
};

interface Props {
  onFileSet: Dispatch<SetStateAction<File | null>>;
}

const INSTRUCTIONS = [
  'Maksymalny rozmiar pliku wideo: <strong>200 MB</strong>.',
  'Maksymalna długość wideo: <strong>60 sekund</strong>.',
  'Akceptowane formaty pliku wideo: <strong>.mp4, .webm, .qt, .mov</strong>.',
  'Preferowana rozdzielczość: <strong>720p</strong> lub <strong>1080p</strong>.',
] as const;

const MAX_VIDEO_DURATION_IN_SECONDS = 60;

const VideoFileInput = ({ onFileSet }: Props) => {
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
        setFileInputErrors(['Maksymalna długość wideo to 60 sekund.']);

        return;
      }

      onFileSet(acceptedFile);
    },
    onDrop: () => setFileInputErrors([]),
    onDropRejected: ([rejectedFile]) => {
      setFileInputErrors(rejectedFile.errors.map((error) => ERROR_MESSAGES[error.code]));
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div
          {...getRootProps({
            className: twMerge(
              'flex h-36 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-yellow-400 bg-shark dropzone gap-2.5 text-sm transition-colors',
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
              'text-yellow-400',
              isFocused && 'text-yellow-100',
              isDragAccept && 'text-green-400',
              isDragReject && 'text-red-400',
            )}
          >
            Przeciągnij i upuść plik wideo, lub kliknij, aby wybrać.
          </span>
        </div>
        {fileInputErrors.map((error) => (
          <p key={error} className="flex items-center gap-2 text-red-400">
            <ErrorIcon /> {error}
          </p>
        ))}
      </div>
      <ul className="flex list-inside list-disc flex-col gap-2 text-xs text-white">
        {INSTRUCTIONS.map((instruction) => (
          <li key={instruction} dangerouslySetInnerHTML={{ __html: instruction }} />
        ))}
      </ul>
    </div>
  );
};

export default VideoFileInput;
