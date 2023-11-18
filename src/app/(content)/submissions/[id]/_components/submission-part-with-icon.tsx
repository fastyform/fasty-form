import { ReactNode } from 'react';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import SubmissionIcons from '@/app/(content)/submissions/[id]/_assets/submission-icons';

const SubmissionPartWithIcon = ({
  children,
  icon,
  verticalLine,
  containerStyles,
}: {
  children: ReactNode;
  icon: keyof typeof SubmissionIcons;
  verticalLine?: boolean;
  containerStyles?: ClassNameValue;
}) => {
  const SubmissionPartIcon = SubmissionIcons[icon];

  return (
    <div className={twMerge('flex gap-2.5', containerStyles)}>
      <div className="flex flex-shrink-0 flex-grow-0 basis-5 flex-col items-center gap-5">
        <SubmissionPartIcon />
        {verticalLine && <div className="rounder-full w-[2px] grow bg-zinc-700" />}
      </div>
      <div className="flex grow flex-col gap-2.5">{children}</div>
    </div>
  );
};

export default SubmissionPartWithIcon;
