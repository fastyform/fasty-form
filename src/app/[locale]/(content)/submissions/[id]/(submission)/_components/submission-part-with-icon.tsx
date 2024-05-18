import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import DescriptionIcon from '@/app/[locale]/(content)/submissions/[id]/(submission)/_assets/description-icon';
import FinishedIcon from '@/app/[locale]/(content)/submissions/[id]/(submission)/_assets/finished-icon';
import SubmissionIcon from '@/app/[locale]/(content)/submissions/[id]/(submission)/_assets/submission-icon';

const submissionIcons = {
  submission: SubmissionIcon,
  description: DescriptionIcon,
  finished: FinishedIcon,
};

interface SubmissionPartWithIconProps {
  children: ReactNode;
  icon: keyof typeof submissionIcons;
  verticalLine?: boolean;
  className?: string;
  verticalLineClassName?: string;
}

const SubmissionPartWithIcon = ({
  children,
  icon,
  verticalLine,
  className,
  verticalLineClassName,
}: SubmissionPartWithIconProps) => {
  const SubmissionPartIcon = submissionIcons[icon];

  return (
    <div className={twMerge('flex gap-2.5', className)}>
      <div className="flex flex-shrink-0 flex-grow-0 basis-5 flex-col items-center gap-5">
        <SubmissionPartIcon />
        {verticalLine && <div className={twMerge('rounder-full w-[2px] grow bg-zinc-700', verticalLineClassName)} />}
      </div>
      <div className="flex grow flex-col gap-2.5">{children}</div>
    </div>
  );
};

export default SubmissionPartWithIcon;
