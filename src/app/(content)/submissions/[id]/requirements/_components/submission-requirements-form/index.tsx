'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import VideoFileInput from '@/app/(content)/submissions/[id]/requirements/_components/video-file-input';
import {
  SubmissionRequirements,
  submissionRequirementsSchema,
} from '@/app/(content)/submissions/[id]/requirements/_utils';
import AppButton from '@/components/app-button';
import AppInputForm from '@/components/app-input/app-input-form';
import ProgressCircular from './_components/progress-circular';
import useOnSubmit from './use-on-submit';

interface Props {
  submissionId: string;
}

const SubmissionRequirementsForm = ({ submissionId }: Props) => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(submissionRequirementsSchema),
    defaultValues: { clientDescription: '' },
    mode: 'onTouched',
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const { onSubmit, isLoading, progress } = useOnSubmit(videoFile, submissionId);

  const videoSrc = useMemo(() => {
    if (!videoFile) return null;

    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  useEffect(
    () => () => {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
    },
    [videoSrc],
  );

  return (
    <>
      {/* NOTE: This textarea size is hardcoded because of the jumping form bug on first render */}
      <form className="flex flex-col gap-5 [&_textarea]:!h-[115px]" onSubmit={handleSubmit(onSubmit)}>
        <span className="text-white">Wideo ćwiczenia</span>
        {videoSrc ? (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <video
                className="aspect-video w-full rounded-xl border border-gray-600"
                controls={!isLoading}
                src={videoSrc}
              >
                Plik wideo nie jest wspierany przez Twoją przeglądarkę. Wspierane pliki to .mp4, .webm, .mov lub .qt.
              </video>
              <AppButton
                classes={{ root: 'py-2 bg-transparent' }}
                className="self-start text-sm text-white"
                onClick={() => setVideoFile(null)}
              >
                Usuń wideo
              </AppButton>
            </div>
          </div>
        ) : (
          <VideoFileInput onFileSet={setVideoFile} />
        )}
        <AppInputForm<SubmissionRequirements>
          fullWidth
          multiline
          control={control}
          disabled={isLoading}
          fieldName="clientDescription"
          label="Opcjonalna wiadomość dla trenera"
          minRows={5}
          placeholder="Wiadomość"
        />
        <AppButton disabled={!videoFile} loading={isLoading} type="submit">
          Wyślij
        </AppButton>
        <div className="flex items-center gap-2.5">
          <WifiRoundedIcon classes={{ root: 'text-[2rem] text-yellow-400' }} />
          <p className="text-sm text-white">Zapewnij stabilne połączenie Wi-Fi w celu szybszego przesyłania wideo.</p>
        </div>
      </form>
      {isLoading && <ProgressCircular progress={progress} />}
    </>
  );
};

export default SubmissionRequirementsForm;
