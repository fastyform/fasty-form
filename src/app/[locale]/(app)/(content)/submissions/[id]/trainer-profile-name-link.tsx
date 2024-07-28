import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import TrainerImage from '@/components/trainer-image';

const TrainerProfileNameLink = ({
  trainerProfileSlug,
  profileName,
  className,
  profileImageUrl,
}: {
  trainerProfileSlug: string;
  profileName: string;
  className?: ClassNameValue;
  profileImageUrl: string | null;
}) => {
  const t = useTranslations();

  return (
    <Link
      className={twMerge('flex items-center gap-2.5 text-base text-white', className)}
      href={`/trainers/${trainerProfileSlug}`}
    >
      <TrainerImage height={40} trainerProfileImageUrl={profileImageUrl} trainerProfileName={profileName} width={40} />
      <span>
        {t('SUBMISSION_TRAINER_PREFIX')} <span className="font-bold text-yellow-400">{profileName}</span>
      </span>
    </Link>
  );
};

export default TrainerProfileNameLink;
