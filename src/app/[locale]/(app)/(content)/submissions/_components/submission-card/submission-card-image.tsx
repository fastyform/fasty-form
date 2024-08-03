import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { getTranslations } from 'next-intl/server';
import { removeFileExtension } from '@/utils';
import s3Client, { BUCKET_NAME_THUMBNAILS } from '@/utils/s3';
import { SubmissionStatus } from '@/utils/types';
import SubmissionCardImageFallback from './submission-card-image-fallback';
import SubmissionCardImageThumbnail from './submission-card-image-thumbnail';

interface Props {
  submissionStatus: SubmissionStatus;
  videoKey: string | null;
  isTrainerAccount: boolean;
}

const VIDEO_THUMBNAIL_URL_EXPIRATION_TIME_IN_SECONDS = 60 * 60 * 6; // 6 hours

const SubmissionCardImage = async ({ submissionStatus, videoKey, isTrainerAccount }: Props) => {
  const t = await getTranslations();

  if (submissionStatus === 'paid') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2.5">
        <FactCheckOutlinedIcon className="fill-yellow-400 text-5xl" />
        <span className=" text-center text-yellow-400">{t.rich('SUBMISSION_FINISH_ORDER')}</span>
      </div>
    );
  }

  if (submissionStatus === 'video_request' && !isTrainerAccount) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2.5 rounded-xl bg-red-400/15">
        <FileUploadOutlinedIcon className="fill-yellow-400 text-5xl" />
        <span className=" text-center text-yellow-400">{t.rich('SUBMISSION_UPLOAD_NEW_VIDEO')}</span>
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
