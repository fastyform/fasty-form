'use client';

import { IconButton } from '@mui/material';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import ShareIcon from '@/app/[locale]/(content)/trainers/[slug]/_assets/share-icon';
import AppButtonNew from '@/components/app-button-new';
import AppTooltip from '@/components/app-tooltip';
import Constants from '@/utils/constants';
import { TrainerDetails } from '@/utils/get-trainer-details-by-id';
import notify from '@/utils/notify';

interface Props {
  trainerDetails: TrainerDetails;
  isIconOnMobile: boolean;
}

const ShareProfileButton = ({ trainerDetails, isIconOnMobile }: Props) => {
  const t = useTranslations();
  const [, copyToClipboard] = useCopyToClipboard();
  if (!trainerDetails.profile_slug || !trainerDetails.profile_name || !trainerDetails.is_onboarded) return null;

  const trainerProfileUrl = `${Constants.ORIGIN_URL}/trainers/${trainerDetails.profile_slug}`;

  const handleShare = async () => {
    const shareData = {
      title: t('TRAINERS_PAGE_SHARE_PROFILE_BUTTON_TEXT_DATA_TITLE', { profileName: trainerDetails.profile_name }),
      text: t('TRAINERS_PAGE_SHARE_PROFILE_BUTTON_TEXT_DATA_DESCRIPTION'),
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
    notify.success(t('TRAINERS_PAGE_SHARE_PROFILE_BUTTON_SUCCESS'));
  };

  const isDisabled = trainerDetails.stripe_onboarding_status !== 'verified';

  return (
    <AppTooltip title={isDisabled ? t('TRAINERS_PAGE_SHARE_PROFILE_BUTTON_DISABLED_TEXT') : undefined}>
      <div>
        <AppButtonNew
          className={twMerge('flex gap-2', isIconOnMobile && 'hidden lg:flex')}
          color="secondary"
          disabled={isDisabled}
          onClick={handleShare}
        >
          <ShareIcon className="fill-white" />
          <span>{t('TRAINERS_PAGE_SHARE_PROFILE_BUTTON_TEXT')}</span>
        </AppButtonNew>
        {isIconOnMobile && (
          <IconButton
            disabled={isDisabled}
            className={twMerge(
              'size-[50px]  lg:hidden',
              isDisabled
                ? 'bg-white/10 [&_svg]:fill-white/30'
                : 'border border-solid border-gray-600 bg-shark [&_svg]:fill-white',
            )}
            onClick={handleShare}
          >
            <ShareIcon />
          </IconButton>
        )}
      </div>
    </AppTooltip>
  );
};

export default ShareProfileButton;
