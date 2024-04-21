import dynamic from 'next/dynamic';

const AmbassadorProgram = async ({ params: { locale } }: { params: { locale: string } }) => {
  const Component = dynamic(() => import(`./translations/${locale}.mdx`));

  return <Component />;
};

export default AmbassadorProgram;
