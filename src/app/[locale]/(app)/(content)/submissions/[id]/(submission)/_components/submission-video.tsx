import { GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import getSubmissionById from '@/app/[locale]/(app)/(content)/submissions/[id]/get-submission-by-id';
import { removeFileExtension } from '@/utils';
import s3Client, { BUCKET_NAME_PROCESSED, BUCKET_NAME_UNPROCESSED } from '@/utils/s3';

const UNPROCESSED_VIDEO_URL_EXPIRATION_TIME_IN_SECONDS = 60 * 10; // 10 minutes
const PROCESSED_VIDEO_URL_EXPIRATION_TIME_IN_SECONDS = 60 * 60 * 2; // 2 hours

const SubmissionVideo = async ({ submissionId }: { submissionId: string }) => {
  const submission = await getSubmissionById(submissionId);

  if (!submission.video_key) throw new Error('No video key');
  const videoKey = submission.video_key;
  const processedVideoKey = `${removeFileExtension(videoKey)}.mp4`;

  let isVideoProcessed = false;

  try {
    await s3Client.send(new HeadObjectCommand({ Bucket: BUCKET_NAME_PROCESSED, Key: processedVideoKey }));
    isVideoProcessed = true;
  } catch {}

  const videoUrl = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: isVideoProcessed ? BUCKET_NAME_PROCESSED : BUCKET_NAME_UNPROCESSED,
      Key: isVideoProcessed ? processedVideoKey : videoKey,
    }),
    {
      expiresIn: isVideoProcessed
        ? PROCESSED_VIDEO_URL_EXPIRATION_TIME_IN_SECONDS
        : UNPROCESSED_VIDEO_URL_EXPIRATION_TIME_IN_SECONDS,
    },
  );

  return <video controls className="aspect-video rounded-xl border border-gray-600 lg:h-80 xl:h-96" src={videoUrl} />;
};

export default SubmissionVideo;
