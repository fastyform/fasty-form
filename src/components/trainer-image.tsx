import Image, { ImageProps } from 'next/image';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';

interface TrainerImageProps extends Omit<ImageProps, 'alt' | 'src'> {
  trainerProfileName: string;
  trainerProfileImageUrl: string | null;
}

const TrainerImage = ({ trainerProfileName, trainerProfileImageUrl, className, ...props }: TrainerImageProps) => {
  const t = useTranslations();

  return (
    <Image
      alt={`${trainerProfileName} ${t('COMMON_TRAINER_PROFILE_ALT')}`}
      className={twMerge('rounded-full border border-gray-600', className)}
      src={trainerProfileImageUrl || '/default-trainer.jpg'}
      {...props}
    />
  );
};

export default TrainerImage;
