'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import VideoFileInput from '@/app/(content)/submissions/[id]/requirements/_components/video-file-input';
import {
  SubmissionRequirements,
  submissionRequirementsSchema,
} from '@/app/(content)/submissions/[id]/requirements/_utils';
import AppButton from '@/components/app-button';
import AppInputForm from '@/components/app-input/app-input-form';
import ProgressCircular from './_components/progress-circular';
import useOnSubmit from './use-on-submit';

// Add error handling
// Add accelerator
// Host in only specific formats
// Check if middleware affects server actions
// What if get object access expires?
// Add thumbnail generation
// Add SubmissionVideo error boundary

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

  return (
    <>
      {/* // NOTE: This textarea size is hardcoded because of the jumping form bug on first render */}
      <form className="flex flex-col gap-5 [&_textarea]:!h-[115px]" onSubmit={handleSubmit(onSubmit)}>
        {videoSrc ? (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="aspect-video w-full">
                <video
                  className="aspect-video rounded-xl border border-gray-600"
                  controls={!isLoading}
                  src={videoSrc}
                />
              </div>
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
          label="Wiadomość dla trenera"
          minRows={5}
          placeholder="Wiadomość"
        />
        <AppButton loading={isLoading} type="submit">
          Wyślij
        </AppButton>
      </form>
      {isLoading && <ProgressCircular progress={progress} />}
    </>
  );
};

export default SubmissionRequirementsForm;
