import { ClassNameValue, twMerge } from 'tailwind-merge';

const statusBadgeData = {
  reviewed: ['bg-yellow-400/75', 'text-black', 'Sprawdzone'],
  unreviewed: ['bg-slate-700/75', 'text-white', 'Oczekujące'],
};

const StatusBadge = ({ type, className }: { className?: ClassNameValue; type: keyof typeof statusBadgeData }) => {
  const [containerColor, textColor, badgeText] = statusBadgeData[type];

  return (
    <div className={twMerge(className, 'rounded-full p-2.5 backdrop-blur lg:px-5', containerColor)}>
      <p className={twMerge('lg:font-semi-bold text-xs font-medium lg:text-base', textColor)}>{badgeText}</p>
    </div>
  );
};

export default StatusBadge;
