'use client';

import { useCopyToClipboard } from '@uidotdev/usehooks';
import { twJoin, twMerge } from 'tailwind-merge';
import ShareIcon from '@/app/[locale]/(content)/trainers/[slug]/_assets/share-icon';
import AppButton from '@/components/app-button';
import AppTooltip from '@/components/app-tooltip';
import Constants from '@/utils/constants';
import { TrainerDetails } from '@/utils/get-trainer-details-by-id';
import notify from '@/utils/notify';

interface Props {
  trainerDetails: TrainerDetails;
  isIconOnMobile?: boolean;
}

const ShareProfileButton = ({ trainerDetails, isIconOnMobile = true }: Props) => {
  const [, copyToClipboard] = useCopyToClipboard();
  if (!trainerDetails.profile_slug || !trainerDetails.profile_name || !trainerDetails.is_onboarded) return null;

  const trainerProfileUrl = `${Constants.ORIGIN_URL}/trainers/${trainerDetails.profile_slug}`;

  const handleShare = async () => {
    const shareData = {
      title: `${Constants.APP_NAME} - Profil Trenera - ${trainerDetails}`,
      text: `Zakup u mnie analizę techniki w ${Constants.APP_NAME}.`,
      url: trainerProfileUrl,
    };

    if (navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);

        return;
      } catch {
        return;
      }
    }

    copyToClipboard(trainerProfileUrl);
    notify.success('Skopiowano link do profilu do schowka');
  };

  const isDisabled = trainerDetails.stripe_onboarding_status !== 'verified';

  return (
    <AppTooltip title={isDisabled ? 'Twój profil trenera będzie widoczny po podłączeniu płatności.' : undefined}>
      <div>
        <AppButton
          disabled={isDisabled}
          classes={{
            root: twMerge(
              'rounded-xl gap-2 border px-5 py-2.5 text-sm font-normal',
              isIconOnMobile && 'h-11 w-11 min-w-0 p-0 lg:h-[unset]t lg:w-[unset] lg:px-5 py-2.5',
            ),
            contained: 'border-solid border-gray-600 bg-shark text-white',
          }}
          onClick={handleShare}
        >
          <ShareIcon className="fill-white" />
          <span className={twJoin(isIconOnMobile && 'hidden lg:block')}>Udostępnij swój profil</span>
        </AppButton>
      </div>
    </AppTooltip>
  );
};

export default ShareProfileButton;
