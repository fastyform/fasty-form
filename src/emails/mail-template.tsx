import { ReactNode } from 'react';
import { Button, Container, Font, Img, Link, Tailwind, Text } from '@react-email/components';
import Constants, { COMPANY_INFO, PRODUCTION_ORIGIN_URL } from '@/utils/constants';
import { IntlShape } from '@/utils/types';

const AppLink = () => <Link href={Constants.ORIGIN_URL}>{Constants.APP_NAME}</Link>;

const LineBreak = () => (
  <>
    <br />
    <br />
  </>
);

const CallToAction = ({ href, children }: { href: string; children: ReactNode }) => (
  <Button
    className="m-auto block w-fit rounded-full bg-yellow-400 px-[30px] py-[18px] text-center text-base font-bold !text-[#0D1116]"
    href={href}
  >
    {children}
  </Button>
);

const Greetings = ({ t }: { t: IntlShape }) => (
  <>
    <LineBreak />
    {t.rich('MAIL_TEMPLATE_GREETINGS')}
  </>
);

const Intro = ({ t }: { t: IntlShape }) => (
  <>
    <LineBreak />
    {t('MAIL_TEMPLATE_INTRO')}
    <LineBreak />
  </>
);

interface MailTemplateProps {
  title: ReactNode;
  children: ReactNode;
}

const MailTemplate = ({ title, children }: MailTemplateProps) => (
  <Tailwind>
    <Font
      fallbackFontFamily="Arial"
      fontFamily="Plus Jakarta Sans"
      fontStyle="normal"
      fontWeight={400}
      webFont={{
        url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap',
        format: 'embedded-opentype',
      }}
    />
    <Container align="center" className="items-center justify-center bg-[#0D1116] p-10">
      <Link className="m-auto block w-fit" href={PRODUCTION_ORIGIN_URL}>
        <Img
          alt="logo"
          src="https://veknudpszbrjutmcmrwk.supabase.co/storage/v1/object/public/assets/Logo.png"
          width={200}
        />
      </Link>
    </Container>
    <Container className="p-5">
      <Text className="m-0 text-center text-2xl font-bold !text-[#1E1E1E]">{title}</Text>
      <Text className="text-base !text-[#1e1e1e]">{children}</Text>
    </Container>
    <Container className="text-center text-xs !text-black/60">{COMPANY_INFO}</Container>
  </Tailwind>
);

export const mailDefaultTranslationValues = {
  MailAppLink: () => <MailTemplate.AppLink />,
  MailContactLink: (chunks: ReactNode) => <Link href={`${Constants.ORIGIN_URL}/contact`}>{chunks}</Link>,
};

MailTemplate.Greetings = Greetings;
MailTemplate.AppLink = AppLink;
MailTemplate.LineBreak = LineBreak;
MailTemplate.CallToAction = CallToAction;
MailTemplate.Intro = Intro;

export default MailTemplate;
