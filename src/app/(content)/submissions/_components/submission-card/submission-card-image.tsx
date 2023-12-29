import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { removeFileExtension } from '@/utils';
import s3Client, { BUCKET_NAME_THUMBNAILS } from '@/utils/s3';
import { SubmissionStatus } from '@/utils/types';
import SubmissionCardImageFallback from './submission-card-image-fallback';
import SubmissionCardImageThumbnail from './submission-card-image-thumbnail';

interface Props {
  submissionStatus: SubmissionStatus;
  videoKey: string | null;
}

const VIDEO_THUMBNAIL_URL_EXPIRATION_TIME_IN_SECONDS = 60 * 60 * 6; // 6 hours

const SubmissionCardImage = async ({ submissionStatus, videoKey }: Props) => {
  if (submissionStatus === 'paid') {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <CloudUploadIcon className="fill-yellow-400" fontSize="large" />
        <span className=" text-yellow-400">Wgraj wideo</span>
      </div>
    );
  }

  if (!videoKey) {
    return <SubmissionCardImageFallback />;
  }

  const getObjectCommand = new GetObjectCommand({
    Bucket: BUCKET_NAME_THUMBNAILS,
    Key: `${removeFileExtension(videoKey)}.webp`,
  });

  let thumbnailSrc = '';

  try {
    thumbnailSrc = await getSignedUrl(s3Client, getObjectCommand, {
      expiresIn: VIDEO_THUMBNAIL_URL_EXPIRATION_TIME_IN_SECONDS,
    });
  } catch {}

  return <SubmissionCardImageThumbnail src={thumbnailSrc} />;
};

export default SubmissionCardImage;
