import { ReactNode } from 'react';
import { Button, Container, Font, Heading, Img, Link, Tailwind, Text } from '@react-email/components';
import Constants, { COMPANY_INFO, PRODUCTION_ORIGIN_URL } from '@/utils/constants';

interface MailTemplateProps {
  title: string;
  children: ReactNode;
}

const AppLink = () => <Link href={Constants.ORIGIN_URL}>{Constants.APP_NAME}</Link>;

const Break = () => (
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
      <Heading as="h2" className="m-0 text-center text-2xl text-[#1E1E1E]">
        {title}
      </Heading>
      <Text className="text-base text-[#1e1e1e]">{children}</Text>
    </Container>
    <Container className="text-center text-xs text-black/60">{COMPANY_INFO}</Container>
  </Tailwind>
);

MailTemplate.AppLink = AppLink;
MailTemplate.Break = Break;
MailTemplate.CallToAction = CallToAction;

export default MailTemplate;
