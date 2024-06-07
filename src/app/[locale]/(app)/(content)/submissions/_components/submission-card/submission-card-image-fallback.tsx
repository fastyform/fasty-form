import Image from 'next/image';
import { useTranslations } from 'next-intl';

const SubmissionCardImageFallback = () => {
  const t = useTranslations();

  return (
    <Image fill alt={t('SUBMISSION_THUMBNAIL_EMPTY_IMG_ALT')} className="object-contain" src="/image-placeholder.png" />
  );
};

export default SubmissionCardImageFallback;
