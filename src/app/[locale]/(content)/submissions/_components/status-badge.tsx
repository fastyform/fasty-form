import { useTranslations } from 'next-intl';
import { ClassNameValue, twMerge } from 'tailwind-merge';

const statusBadgeData = {
  reviewed: ['bg-yellow-400/75', 'text-black'],
  unreviewed: ['bg-slate-700/75', 'text-white'],
  paid: ['bg-bunker border border-gray-600', 'text-white'],
  paidout: ['bg-gray-600', 'text-white'],
  skeleton: ['bg-shark animate-pulse', 'text-shark'],
} as const;

interface StatusBadgeProps {
  className?: ClassNameValue;
  type: keyof typeof statusBadgeData;
  isTrainerAccount?: boolean;
}

const StatusBadge = ({ type, className, isTrainerAccount }: StatusBadgeProps) => {
  const t = useTranslations();
  const visibleStatus = type === 'paidout' ? 'reviewed' : type;

  const [containerClasses, textColor] = statusBadgeData[isTrainerAccount ? type : visibleStatus];

  return (
    <div
      className={twMerge(
        'flex items-center justify-center rounded-full px-5 py-2.5 backdrop-blur',
        containerClasses,
        className,
      )}
    >
      <p className={twMerge('lg:font-semi-bold text-xs font-medium lg:text-base', textColor)}>
        {t(`SUBMISSIONS_${isTrainerAccount ? type : visibleStatus}`)}
      </p>
    </div>
  );
};

export default StatusBadge;
