import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import getSubmissionById from '@/app/(content)/submissions/[id]/(submission)/_utils/get-submission-by-id';
import { BUCKET_NAME, S3_CLIENT_PARAMS } from '@/app/(content)/submissions/[id]/_utils';

const VIDEO_URL_EXPIRATION_TIME_IN_SECONDS = 60 * 60; // 1 hour

const SubmissionVideo = async ({ submissionId }: { submissionId: string }) => {
  const submission = await getSubmissionById(submissionId);

  if (!submission.video_key) throw new Error('No video key');

  const s3Client = new S3Client(S3_CLIENT_PARAMS);
  const getObjectCommand = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: submission.video_key,
  });

  const videoUrl = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: VIDEO_URL_EXPIRATION_TIME_IN_SECONDS });

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
