import { ReactNode } from 'react';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import submissionIcons from '@/app/(content)/submissions/[id]/_assets/submission-icons';

const SubmissionPartWithIcon = ({
  children,
  icon,
  verticalLine,
  containerStyles,
}: {
  children: ReactNode;
  icon: keyof typeof submissionIcons;
  verticalLine?: boolean;
  containerStyles?: ClassNameValue;
}) => {
  const SubmissionPartIcon = submissionIcons[icon];

  return (
    <div className={twMerge('flex gap-2.5', containerStyles)}>
      <div className="flex flex-shrink-0 flex-grow-0 basis-5 flex-col items-center gap-5">
        <SubmissionPartIcon className={twMerge('fill-white', icon === 'finished' && 'fill-yellow-400')} />
        {verticalLine && <div className="rounder-full w-[2px] grow bg-zinc-700" />}
      </div>
      <div className="flex grow flex-col gap-2.5">{children}</div>
    </div>
  );
};

export default SubmissionPartWithIcon;
