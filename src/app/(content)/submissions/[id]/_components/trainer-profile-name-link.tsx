import { Route } from 'next';
import Link from 'next/link';
import { ClassNameValue, twMerge } from 'tailwind-merge';

const TrainerProfileNameLink = ({
  trainerProfileSlug,
  profileName,
  className,
}: {
  trainerProfileSlug: string;
  profileName: string;
  className?: ClassNameValue;
}) => (
  <Link className={twMerge('text-base text-white', className)} href={`/trainers/${trainerProfileSlug}` as Route}>
    <span>Trener: </span>
    <span className="font-bold text-yellow-400">{profileName}</span>
  </Link>
);

export default TrainerProfileNameLink;
