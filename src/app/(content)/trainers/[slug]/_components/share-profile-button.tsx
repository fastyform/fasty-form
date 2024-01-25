'use client';

import { useCopyToClipboard } from '@uidotdev/usehooks';
import { twJoin } from 'tailwind-merge';
import ShareIcon from '@/app/(content)/trainers/[slug]/_assets/share-icon';
import Constants from '@/utils/constants';
import { TrainerDetails } from '@/utils/get-trainer-details-by-id';
import notify from '@/utils/notify';

interface Props {
  trainerDetails: TrainerDetails;
  isIconOnMobile?: boolean;
}

const ShareProfileButton = ({ trainerDetails, isIconOnMobile = true }: Props) => {
  const [, copyToClipboard] = useCopyToClipboard();
  if (!trainerDetails.profile_slug || !trainerDetails.profile_name) return null;

  const trainerProfileUrl = `${Constants.ORIGIN_URL}/trainers/${trainerDetails.profile_slug}`;

  const handleShare = async () => {
    const shareData = {
      title: `${Constants.APP_NAME} - Profil Trenera - ${trainerDetails}`,
      text: `Zakup u mnie analizę wideo w ${Constants.APP_NAME}.`,
      url: trainerProfileUrl,
    };

    if (navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);

        return;
      } catch {}
    }

    copyToClipboard(trainerProfileUrl);
    notify.success('Skopiowano link do profilu do schowka');
  };

  return (
    <button
      type="button"
      className={twJoin(
        'flex items-center justify-center gap-2.5 rounded-xl border border-solid border-gray-600 bg-shark text-sm font-normal text-white transition-opacity',
        isIconOnMobile
          ? 'h-11 w-11 min-w-0 lg:w-fit lg:px-5 lg:py-2.5 lg:hover:opacity-80'
          : 'w-fit px-5 py-2.5 lg:hover:opacity-80',
      )}
      onClick={handleShare}
    >
      <ShareIcon className="fill-white" />
      <span className={twJoin(isIconOnMobile && 'hidden lg:block')}>Udostępnij swój profil</span>
    </button>
  );
};

export default ShareProfileButton;
