import { Route } from 'next';
import Link from 'next/link';
import { ClassNameValue, twMerge } from 'tailwind-merge';

const TrainerProfileNameLink = ({
  trainerId,
  profileName,
  className,
}: {
  trainerId: string;
  profileName: string;
  className?: ClassNameValue;
}) => (
  <Link className={twMerge('text-base text-white', className)} href={`/trainers/${trainerId}` as Route}>
    <span>Trener: </span>
    <span className="font-bold text-yellow-400">{profileName}</span>
  </Link>
);

export default TrainerProfileNameLink;
