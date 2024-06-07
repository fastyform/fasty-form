'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import { useTranslations } from 'next-intl';
import VideoFileInput, {
  ALLOWED_FORMATS,
} from '@/app/[locale]/(app)/(content)/submissions/[id]/requirements/_components/video-file-input';
import {
  SubmissionRequirements,
  submissionRequirementsSchema,
} from '@/app/[locale]/(app)/(content)/submissions/[id]/requirements/utils';
import AppButton from '@/components/app-button';
import AppInputForm from '@/components/app-input/app-input-form';
import ProgressCircular from './progress-circular';
import useOnSubmit from './use-on-submit';

interface Props {
  submissionId: string;
}

const SubmissionRequirementsForm = ({ submissionId }: Props) => {
  const t = useTranslations();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(submissionRequirementsSchema(t)),
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
        <div className="mb-2 flex flex-col gap-2.5">
          <span className="text-white">{t('SUBMISSION_REQUIREMENTS_VIDEO_INPUT_LABEL')}</span>
          {videoSrc ? (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <video
                  className="aspect-video w-full rounded-xl border border-gray-600"
                  controls={!isLoading}
                  src={videoSrc}
                >
                  {t('SUBMISSION_REQUIREMENTS_VIDEO_ERROR_INFO', { formats: ALLOWED_FORMATS })}
                </video>
                <AppButton
                  className="self-start"
                  color="secondary"
                  size="small"
                  variant="text"
                  onClick={() => setVideoFile(null)}
                >
                  {t('SUBMISSION_REQUIREMENTS_VIDEO_INPUT_REMOVE')}
                </AppButton>
              </div>
            </div>
          ) : (
            <VideoFileInput onFileSet={setVideoFile} />
          )}
        </div>
        <AppInputForm<SubmissionRequirements>
          fullWidth
          multiline
          control={control}
          disabled={isLoading}
          fieldName="clientDescription"
          label={t('SUBMISSION_REQUIREMENTS_DESCRIPTION_LABEL')}
          minRows={5}
          placeholder={t('SUBMISSION_REQUIREMENTS_DESCRIPTION_PLACEHOLDER')}
        />
        <AppButton disabled={!videoFile} loading={isLoading} size="large" type="submit">
          {t('COMMON_SEND')}
        </AppButton>
        <div className="flex items-center gap-2.5">
          <WifiRoundedIcon classes={{ root: 'text-[2rem] text-yellow-400' }} />
          <p className="text-sm text-white">{t('SUBMISSION_REQUIREMENTS_STABLE_CONNECTION_INFO')}</p>
        </div>
      </form>
      {isLoading && <ProgressCircular progress={progress} />}
    </>
  );
};

export default SubmissionRequirementsForm;
