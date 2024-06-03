import { useTranslations } from 'next-intl';
import { ClassNameValue, twMerge } from 'tailwind-merge';

const statusBadgeData = {
  reviewed: ['bg-[#28a745]/60 border-[#28a745]', 'text-white'],
  unreviewed: ['bg-[#007bff]/60 border-[#007bff]', 'text-white'],
  paid: ['bg-[#17a2b8]/60 border-[#17a2b8]', 'text-white'],
  paidout: ['bg-[#6f42c1]/60 border-[#6f42c1]', 'text-white'],
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
        'flex items-center justify-center rounded-lg border border-solid px-2.5 py-1 backdrop-blur',
        containerClasses,
        className,
      )}
    >
      <p className={twMerge('rounded-full text-[10px] font-semibold uppercase tracking-widest', textColor)}>
        {t(`SUBMISSIONS_${isTrainerAccount ? type : visibleStatus}`)}
      </p>
    </div>
  );
};

export default StatusBadge;
