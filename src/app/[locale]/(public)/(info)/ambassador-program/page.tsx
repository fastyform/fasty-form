import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import Constants from '@/utils/constants';

const AmbassadorProgram = async ({ params: { locale } }: { params: { locale: string } }) => {
  const t = await getTranslations();
  const Component = dynamic(() => import(`./translations/${locale}.mdx`));

  return (
    <>
      <h1 className="text-2xl font-bold">
        {t('AMBASSADOR_TOS_PAGE_TITLE')} <span className="text-yellow-400">{Constants.APP_NAME}</span>
      </h1>
      <Component />
    </>
  );
};

export default AmbassadorProgram;
