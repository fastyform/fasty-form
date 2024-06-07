import { ReactNode } from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { twMerge } from 'tailwind-merge';
import DescriptionIcon from '@/app/[locale]/(app)/(content)/submissions/[id]/(submission)/_assets/description-icon';
import FinishedIcon from '@/app/[locale]/(app)/(content)/submissions/[id]/(submission)/_assets/finished-icon';
import SubmissionIcon from '@/app/[locale]/(app)/(content)/submissions/[id]/(submission)/_assets/submission-icon';

const submissionIcons = {
  submission: SubmissionIcon,
  description: DescriptionIcon,
  finished: FinishedIcon,
  buyAgain: AutorenewIcon,
};

interface SubmissionPartWithIconProps {
  children: ReactNode;
  icon: keyof typeof submissionIcons;
  verticalLine?: boolean;
  className?: string;
  verticalLineClassName?: string;
  iconClassName?: string;
}

const SubmissionPartWithIcon = ({
  children,
  icon,
  verticalLine,
  className,
  iconClassName,
  verticalLineClassName,
}: SubmissionPartWithIconProps) => {
  const SubmissionPartIcon = submissionIcons[icon];

  return (
    <div className={twMerge('flex gap-2.5', className)}>
      <div className="flex flex-shrink-0 flex-grow-0 basis-5 flex-col items-center gap-5">
        <SubmissionPartIcon className={twMerge('text-[28px]', iconClassName)} />
        {verticalLine && <div className={twMerge('w-[2px] grow rounded-full bg-zinc-700', verticalLineClassName)} />}
      </div>
      <div className="flex grow flex-col gap-2.5">{children}</div>
    </div>
  );
};

export default SubmissionPartWithIcon;
