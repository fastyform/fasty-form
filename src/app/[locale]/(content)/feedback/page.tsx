import { unstable_setRequestLocale } from 'next-intl/server';
import { Locale } from '@/utils/constants';
import FeedbackForm from './feedback-form';

const FeedbackPage = ({ params: { locale } }: { params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);

  return (
    <div className="flex w-full flex-col gap-10 self-center sm:max-w-lg md:mx-auto">
      <div className="flex flex-col gap-2.5 text-white">
        <h1 className="text-3xl">Twoje zdanie ma dla nas ogromne znaczenie</h1>
      </div>
      <FeedbackForm />
    </div>
  );
};

export default FeedbackPage;
