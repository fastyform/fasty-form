import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import { getTranslations } from 'next-intl/server';
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
  const t = await getTranslations();

  if (submissionStatus === 'paid') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2.5">
        <FactCheckOutlinedIcon className="fill-yellow-400 text-5xl" />
        <span className=" text-center text-yellow-400">{t.rich('SUBMISSION_FINISH_ORDER')}</span>
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
