import { HeadObjectCommand } from '@aws-sdk/client-s3';
import getSubmissionById from '@/app/(content)/submissions/[id]/(submission)/_utils/get-submission-by-id';
import { removeFileExtension } from '@/utils';
import Constants from '@/utils/constants';
import s3Client, { BUCKET_NAME_PROCESSED } from '@/utils/s3';

const UNPROCESSED_VIDEO_URL_EXPIRATION_TIME_IN_SECONDS = 60 * 10; // 10 minutes
const PROCESSED_VIDEO_URL_EXPIRATION_TIME_IN_SECONDS = 60 * 60; // 1 hour

export const getVideoUrlExpirationTimeInSeconds = (isProcessed: boolean) => {
  if (isProcessed) return PROCESSED_VIDEO_URL_EXPIRATION_TIME_IN_SECONDS;

  return UNPROCESSED_VIDEO_URL_EXPIRATION_TIME_IN_SECONDS;
};

export const getProcessedVideoKey = (videoKey: string) => `${removeFileExtension(videoKey)}.webm`;

const SubmissionVideo = async ({ submissionId }: { submissionId: string }) => {
  const submission = await getSubmissionById(submissionId);

  if (!submission.video_key) throw new Error('No video key');

  let isVideoProcessed = false;

  try {
    await s3Client.send(
      new HeadObjectCommand({ Bucket: BUCKET_NAME_PROCESSED, Key: getProcessedVideoKey(submission.video_key) }),
    );
    isVideoProcessed = true;
  } catch {}

  const response = await fetch(
    `${Constants.ORIGIN_URL}/api/video/url/${submission.video_key}?isProcessed=${isVideoProcessed}`,
    {
      method: 'GET',
      next: { revalidate: getVideoUrlExpirationTimeInSeconds(isVideoProcessed) },
    },
  );
  if (!response.ok) throw new Error('Failed to get video url');

  const { videoUrl } = (await response.json()) as { videoUrl: string };

  return (
    <video
      controls
      className="aspect-video rounded-xl border border-gray-600 lg:order-2 lg:h-80 xl:h-96"
      src={videoUrl}
    />
  );
};

export default SubmissionVideo;
