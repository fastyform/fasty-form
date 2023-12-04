import { ClassNameValue, twMerge } from 'tailwind-merge';

const statusBadgeData = {
  reviewed: ['bg-yellow-400/75', 'text-black', 'Sprawdzone'],
  unreviewed: ['bg-slate-700/75', 'text-white', 'Oczekujące'],
  paid: ['bg-[#0D1116] border border-gray-600 ', 'text-white', 'Zapłacone'],
  skeleton: ['bg-[#1E2226] animate-pulse', 'text-[#1E2226]', 'Oczekujące'],
};

const StatusBadge = ({ type, className }: { className?: ClassNameValue; type: keyof typeof statusBadgeData }) => {
  const [containerClasses, textColor, badgeText] = statusBadgeData[type];

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
