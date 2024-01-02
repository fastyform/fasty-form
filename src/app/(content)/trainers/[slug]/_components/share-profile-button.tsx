'use client';

import { useCopyToClipboard } from '@uidotdev/usehooks';
import ShareIcon from '@/app/(content)/trainers/[slug]/_assets/share-icon';
import Constants from '@/utils/constants';
import notify from '@/utils/notify';

const ShareProfileButton = ({ profileName }: { profileName: string }) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const handleShare = async () => {
    const shareData = {
      title: `${Constants.APP_NAME} - Profil Trenera - ${profileName}`,
      text: `Zakup u mnie analizę wideo w ${Constants.APP_NAME}.`,
      url: window.location.href,
    };

    if (navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);

        return;
      } catch {}
    }

    copyToClipboard(window.location.href);
    notify.success('Skopiowano link do profilu do schowka');
  };

  return (
    <button
      className="flex h-11 w-11 min-w-0 items-center justify-center gap-2.5 rounded-xl border border-solid border-gray-600 bg-[#1E2226] text-sm font-normal text-white lg:w-fit lg:px-5 lg:py-2.5 lg:transition-opacity lg:hover:opacity-80"
      type="button"
      onClick={handleShare}
    >
      <ShareIcon className="fill-white" />
      <span className="hidden lg:block">Skopiuj link do profilu</span>
    </button>
  );
};

export default ShareProfileButton;
