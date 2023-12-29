'use client';

import { useState } from 'react';
import SubmissionCardImageFallback from './submission-card-image-fallback';

const SubmissionCardImageThumbnail = ({ src }: { src: string }) => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    return <SubmissionCardImageFallback />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt="Miniaturka zgłoszenia wideo"
      className="absolute inset-0	h-full w-full object-contain"
      src={src}
      onError={() => setIsError(true)}
    />
  );
};

export default SubmissionCardImageThumbnail;
