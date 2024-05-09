import Link from 'next/link';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Constants, { Locale } from '@/utils/constants';
import getUserWithNull from '@/utils/get-user-with-null';
import ContactForm from './_components/contact-form';

const ContactPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);

  const t = await getTranslations();
  const user = await getUserWithNull();

  return (
    <div className="flex flex-col justify-between gap-10 self-center lg:flex-row lg:self-auto">
      <div className="flex max-w-md flex-1 flex-col gap-5">
        <h2 className="text-2xl font-bold text-white">{t('CONTACT_FORM_TITLE')}</h2>
        <ContactForm userEmail={user?.email} />
      </div>
      <div className="flex max-w-xl flex-1 flex-col gap-5 text-sm text-white">
        <h2 className="text-2xl font-bold">{t('CONTACT_TITLE')}</h2>
        <p>{t.rich('CONTACT_DESCRIPTION')}</p>
        <ul className="flex list-disc flex-col gap-2.5">
          <li>{t.rich('CONTACT_FORM_TEXT')}</li>
          <li>
            <strong>E-mail:</strong> {t('CONTACT_EMAIL_TEXT')}
            <Link className="font-bold text-yellow-400" href={`mailto:${Constants.SUPPORT_MAIL}`}>
              {Constants.SUPPORT_MAIL}
            </Link>
            .
          </li>
        </ul>

        <p>{t.rich('CONTACT_DESCRIPTION_THANK_YOU')}</p>
      </div>
    </div>
  );
};

export default ContactPage;
