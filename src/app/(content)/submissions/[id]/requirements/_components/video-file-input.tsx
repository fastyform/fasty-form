'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ErrorIcon from '@/assets/error-icon';

const MAX_FILE_SIZE_IN_BYTES = 104857600 * 2; // 200 MB

const ERROR_MESSAGES: { [key: string]: string } = {
  'file-invalid-type': 'Plik musi być plikiem wideo w formacie .mp4, .webm lub .mov.',
  'file-too-large': 'Maksymalna wielkość pliku wideo to 200 MB.',
};

interface Props {
  onFileSet: Dispatch<SetStateAction<File | null>>;
}

const MAX_VIDEO_DURATION_IN_SECONDS = 60;

const VideoFileInput = ({ onFileSet }: Props) => {
  const [fileInputErrors, setFileInputErrors] = useState<string[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
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
    <div className="flex flex-col gap-2">
      <div
        {...getRootProps({
          className:
            'flex h-36 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-yellow-400 bg-[#1E2226] dropzone',
        })}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon className="fill-yellow-400" fontSize="large" />
        <span className=" text-yellow-400">Wgraj wideo</span>
      </div>
      {fileInputErrors.map((error) => (
        <p key={error} className="flex items-center gap-2 text-red-400">
          <ErrorIcon /> {error}
        </p>
      ))}
    </div>
  );
};

export default VideoFileInput;
