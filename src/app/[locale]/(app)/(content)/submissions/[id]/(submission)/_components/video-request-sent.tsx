import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTranslations } from 'next-intl';

const VideoRequestSent = () => {
  const t = useTranslations();

  return (
    <div className="relative aspect-video rounded-xl bg-shark text-center lg:order-2 lg:h-80 xl:h-96">
      <div className="absolute left-1/2 top-1/2 flex w-full max-w-96 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 px-5 text-white">
        <InfoOutlinedIcon className="w-6 shrink-0" />
        <span className="text-xs">{t('SUBMISSION_REQUEST_NEW_VIDEO_SENT_DESCRIPTION')}</span>
      </div>
    </div>
  );
};

export default VideoRequestSent;
