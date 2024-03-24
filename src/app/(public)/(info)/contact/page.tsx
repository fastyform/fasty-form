import Link from 'next/link';
import Constants from '@/utils/constants';
import getUserWithNull from '@/utils/get-user-with-null';
import ContactForm from './_components/contact-form';

const ContactPage = async () => {
  const user = await getUserWithNull();

  return (
    <div className="flex flex-col justify-between gap-10 self-center lg:flex-row lg:self-auto">
      <div className="flex max-w-md flex-1 flex-col gap-5">
        <h2 className="text-2xl font-bold text-white">Formularz kontaktowy</h2>
        <ContactForm userEmail={user?.email} />
      </div>
      <div className="flex max-w-xl flex-1 flex-col gap-5 text-sm text-white">
        <h2 className="text-2xl font-bold">Skontaktuj się z nami - Twoja opinia ma dla nas ogromne znaczenie!</h2>
        <p>
          Cześć!
          <br />
          <br /> W {Constants.APP_NAME} ciągle dążymy do doskonałości, ale wiemy, że zawsze istnieje przestrzeń na
          rozwój i ulepszenia. Dlatego też Twoje spostrzeżenia i opinie są dla nas niezwykle cenne!
          <br />
          <br /> Jeśli napotkałeś jakiekolwiek błędy, problemy techniczne, czy masz jakiekolwiek sugestie, jak możemy
          poprawić naszą stronę lub usługi, prosimy o kontakt. Każda uwaga jest dla nas ważna i każdą traktujemy bardzo
          poważnie.
          <br />
          <br />
          <strong>Jak możesz się z nami skontaktować?</strong>
          <br />
        </p>
        <ul className="flex list-disc flex-col gap-2.5">
          <li>
            <strong>Formularz Kontaktowy:</strong> Wystarczy, że wypełnisz formularz na tej stronie. Odpowiemy
            najszybciej jak to możliwe!
          </li>
          <li>
            <strong>E-mail:</strong> Możesz także wysłać do nas wiadomość bezpośrednio na{' '}
            <Link className="font-bold text-yellow-400" href={`mailto:${Constants.SUPPORT_MAIL}`}>
              {Constants.SUPPORT_MAIL}
            </Link>
            .
          </li>
        </ul>

        <p>
          Każdy zgłoszony problem jest dla nas okazją do ulepszenia, a każda sugestia może być iskrą potrzebną do
          stworzenia czegoś wyjątkowego. Pamiętaj, że Twoja opinia jest dla nas cenna i stanowi ważną część naszej
          społeczności.
          <br />
          <br /> Z góry dziękujemy za każdy kontakt i każdą uwagę. Razem tworzymy lepsze miejsce w sieci! <br />
          <br />
          Serdecznie,
          <br />
          Zespół {Constants.APP_NAME}
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
