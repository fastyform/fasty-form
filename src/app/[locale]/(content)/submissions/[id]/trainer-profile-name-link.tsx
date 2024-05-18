import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ClassNameValue, twMerge } from 'tailwind-merge';

const TrainerProfileNameLink = ({
  trainerProfileSlug,
  profileName,
  className,
}: {
  trainerProfileSlug: string;
  profileName: string;
  className?: ClassNameValue;
}) => {
  const t = useTranslations();

  return (
    <Link className={twMerge('text-base text-white', className)} href={`/trainers/${trainerProfileSlug}`}>
      <span>{t('SUBMISSION_TRAINER_PREFIX')} </span>
      <span className="font-bold text-yellow-400">{profileName}</span>
    </Link>
  );
};

export default TrainerProfileNameLink;
