import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StatusBadge from '@/app/(content)/submissions/_components/status-badge';
import getUserRoleFromSession from '@/utils/supabase/get-user-role-from-session';
import { Database } from '@/utils/supabase/supabase';

export const SubmissionCardContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-5 rounded-xl border border-gray-600 bg-[#1e2226] p-2.5 lg:p-5">{children}</div>
);

const SubmissionCard = async ({
  submissionId,
  trainerProfileName,
  submissionStatus,
  thumbnailUrl,
}: {
  submissionId: number;
  trainerProfileName: string | undefined;
  submissionStatus: Database['public']['Enums']['status'];
  thumbnailUrl: string | null;
}) => {
  const isClientAccount = (await getUserRoleFromSession()) === 'client';

  return (
    <SubmissionCardContainer>
      <div className="flex w-full flex-col items-start gap-5 rounded-xl">
        <div className="relative h-60 w-full rounded-xl bg-[#0D1116] min-[450px]:h-40 lg:h-60">
          <Image
            fill
            className="rounded-xl object-contain"
            src={thumbnailUrl || '/image-placeholder.png'}
            alt={
              thumbnailUrl ? `Zdjęcie zgłoszenia o id: ${submissionId}` : `Placeholder zgłoszenia o id: ${submissionId}`
            }
          />
          <StatusBadge className="absolute right-[5px] top-[5px] lg:right-2.5 lg:top-2.5" type={submissionStatus} />
        </div>
        {isClientAccount && trainerProfileName && (
          <h5 className="text-sm font-bold text-white lg:text-xl">{trainerProfileName}</h5>
        )}
      </div>
      {/* TODO ADD ID TO GO TO SUBMISSION PAGE */}
      <Link
        className="w-full rounded-full bg-yellow-400 py-[10px] text-center text-xs font-bold text-black lg:text-base"
        href="/submissions"
      >
        Szczegóły
      </Link>
    </SubmissionCardContainer>
  );
};

export default SubmissionCard;
