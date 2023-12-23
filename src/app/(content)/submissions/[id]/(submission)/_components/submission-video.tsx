import { GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import getSubmissionById from '@/app/(content)/submissions/[id]/(submission)/_utils/get-submission-by-id';
import s3Client, { BUCKET_NAME_PROCESSED, BUCKET_NAME_UNPROCESSED } from '@/utils/s3';

const VIDEO_URL_EXPIRATION_TIME_IN_SECONDS = 60 * 60; // 1 hour

const removeFileExtension = (fileName: string) => fileName.split('.').slice(0, -1).join('.');

const SubmissionVideo = async ({ submissionId }: { submissionId: string }) => {
  const submission = await getSubmissionById(submissionId);

  if (!submission.video_key) throw new Error('No video key');

  const videoKey = submission.video_key;

  let isVideoProcessed = false;

  const processedVideoKey = `${removeFileExtension(videoKey)}.webm`;

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
      expiresIn: VIDEO_URL_EXPIRATION_TIME_IN_SECONDS,
    },
  );

  return (
    <video
      controls
      className="aspect-video rounded-xl border border-gray-600 lg:order-2 lg:h-80 xl:h-96"
      poster={submission.thumbnail_url || undefined}
      src={videoUrl}
    />
  );
};

export default SubmissionVideo;
