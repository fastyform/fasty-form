import { ClassNameValue, twMerge } from 'tailwind-merge';

const statusBadgeData = {
  reviewed: ['bg-yellow-400/75', 'text-black', 'Sprawdzone'],
  unreviewed: ['bg-slate-700/75', 'text-white', 'Oczekujące'],
  paid: ['bg-bunker border border-gray-600', 'text-white', 'Zapłacone'],
  paidout: ['bg-gray-600', 'text-white', 'Wypłacono'],
  skeleton: ['bg-shark animate-pulse', 'text-shark', 'Oczekujące'],
};

const StatusBadge = ({
  type,
  className,
  isTrainerAccount,
}: {
  className?: ClassNameValue;
  type: keyof typeof statusBadgeData;
  isTrainerAccount?: boolean;
}) => {
  const visibleStatus = type === 'paidout' ? 'reviewed' : type;

  const [containerClasses, textColor, badgeText] = statusBadgeData[isTrainerAccount ? type : visibleStatus];

  return (
    <div
      className={twMerge(
        `flex items-center justify-center rounded-full px-5 py-2.5 backdrop-blur`,
        containerClasses,
        className,
      )}
    >
      <p className={twMerge(`lg:font-semi-bold text-xs font-medium lg:text-base`, textColor)}>{badgeText}</p>
    </div>
  );
};

export default StatusBadge;
