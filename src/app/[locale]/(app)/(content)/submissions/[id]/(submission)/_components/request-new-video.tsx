'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import actionRequestNewVideo from '@/app/[locale]/(app)/(content)/submissions/[id]/(submission)/_utils/action-request-new-video';
import {
  requestNewVideoSchema,
  RequestNewVideoValues,
} from '@/app/[locale]/(app)/(content)/submissions/[id]/(submission)/_utils/request-new-video-utils';
import AppButton from '@/components/app-button';
import AppInputForm from '@/components/app-input/app-input-form';
import AppModal from '@/components/app-modal';
import notify from '@/utils/notify';

const RequestNewVideo = ({ submissionId, videoKey }: { submissionId: string; videoKey: string }) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  const form = useForm<RequestNewVideoValues>({
    resolver: zodResolver(requestNewVideoSchema(t)),
    defaultValues: { newVideoRequirements: '' },
    mode: 'onTouched',
  });

  const requestNewVideoMutation = useMutation({
    mutationFn: (data: RequestNewVideoValues) =>
      actionRequestNewVideo({
        newVideoRequirements: data.newVideoRequirements,
        submissionId,
        videoKey,
      }),
    onError: () => {
      notify.error(t('COMMON_ERROR'));
    },
    onSuccess: () => {
      notify.success(t('SUBMISSION_REQUEST_NEW_VIDEO_SUCCESS'));
      form.reset();
      setOpen(false);
    },
  });

  const handleClose = () => {
    if (requestNewVideoMutation.isPending) return;

    setOpen(false);
    form.reset();
  };

  return (
    <>
      <AppButton className="mr-auto" size="small" variant="outlined" onClick={() => setOpen(true)}>
        {t('SUBMISSION_REQUEST_NEW_VIDEO_CTA')}
      </AppButton>
      <AppModal open={open} onClose={handleClose}>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xl font-bold text-white lg:text-2xl">
              {t('SUBMISSION_REQUEST_NEW_VIDEO_MODAL_TITLE')}
            </h4>
            <p className="text-sm text-white">{t('SUBMISSION_REQUEST_NEW_VIDEO_MODAL_DESCRIPTION')}</p>
          </div>
          <form className="flex w-full flex-col gap-5">
            <AppInputForm
              multiline
              className="w-full"
              control={form.control}
              fieldName="newVideoRequirements"
              InputProps={{ classes: { multiline: '!bg-bunker' } }}
              label={t('SUBMISSION_REQUEST_NEW_VIDEO_MODAL_MESSAGE_LABEL')}
              minRows={5}
            />
            <AppButton
              loading={requestNewVideoMutation.isPending}
              type="submit"
              onClick={form.handleSubmit((data) => {
                requestNewVideoMutation.mutate(data);
              })}
            >
              {t('SUBMISSION_REQUEST_NEW_VIDEO_MODAL_SUBMIT')}
            </AppButton>
          </form>
        </div>
      </AppModal>
    </>
  );
};

export default RequestNewVideo;
