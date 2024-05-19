'use client';

import { useState } from 'react';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import actionCompleteUploadAndSendRequirements from '@/app/[locale]/(content)/submissions/[id]/requirements/_actions/action-complete-upload-and-send-requirements';
import actionGetUploadParts from '@/app/[locale]/(content)/submissions/[id]/requirements/_actions/action-get-upload-parts';
import { SubmissionRequirements } from '@/app/[locale]/(content)/submissions/[id]/requirements/utils';
import notify from '@/utils/notify';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size

type UploadData = {
  uploadId: string | undefined;
  videoKey: string;
} | null;

const useOnSubmit = (videoFile: File | null, submissionId: string) => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const [totalProgress, setTotalProgress] = useState(0);

  const onSubmit = async ({ clientDescription }: SubmissionRequirements) => {
    if (!videoFile) return;

    setIsLoading(true);

    let abortData: UploadData = null;

    try {
      const totalParts = Math.ceil(videoFile.size / CHUNK_SIZE);

      const { presignedUrls, uploadId, videoKey } = await actionGetUploadParts({
        fileName: videoFile.name,
        totalParts,
      });
      abortData = { uploadId, videoKey };

      const progressArray = new Array(totalParts).fill(0);

      const uploadPartsPromises = presignedUrls.map((presignedUrl, index) => {
        const start = index * CHUNK_SIZE;
        const end = Math.min((index + 1) * CHUNK_SIZE, videoFile.size);

        const chunk = videoFile.slice(start, end);

        return axios.put<never, { headers: { etag: string } }>(presignedUrl, chunk, {
          onUploadProgress: ({ progress }) => {
            progressArray[index] = progress;

            setTotalProgress(progressArray.reduce((acc, current) => acc + current * 100, 0) / totalParts);
          },
        });
      });

      const uploadPartsResponses = await Promise.all(uploadPartsPromises);

      const parts = uploadPartsResponses.map((uploadPartResponse, index) => ({
        ETag: uploadPartResponse.headers.etag,
        PartNumber: index + 1,
      }));

      await actionCompleteUploadAndSendRequirements({
        videoKey,
        parts,
        uploadId,
        submissionId,
        clientDescription,
      });
    } catch (error: any) {
      if (abortData) {
        axios.delete('/api/video/upload', { data: abortData }).catch(() => {});
      }

      if (error.message === 'Trainer ID is missing') {
        setIsLoading(false);

        return notify.error(t('ERROR_TRAINER_ID_MISSING'));
      }
      notify.error(t('COMMON_ERROR'));
      setIsLoading(false);
    }
  };

  return {
    progress: totalProgress,
    onSubmit,
    isLoading,
  };
};

export default useOnSubmit;
