'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SubmissionCardImageFallback from './submission-card-image-fallback';

const SubmissionCardImageThumbnail = ({ src }: { src: string }) => {
  const t = useTranslations();
  const [isError, setIsError] = useState(false);

  if (isError) {
    return <SubmissionCardImageFallback />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={t('SUBMISSION_THUMBNAIL_IMG_ALT')}
      className="absolute inset-0	h-full w-full object-contain"
      src={src}
      onError={() => setIsError(true)}
    />
  );
};

export default SubmissionCardImageThumbnail;
