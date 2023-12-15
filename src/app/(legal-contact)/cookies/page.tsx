import { cookies } from 'next/headers';
import ConsentSwitches from './_components/consent-switches';
import cookiesData from './_utils/cookies-data';

const Cookies = () => {
  const cookiesConsent = cookies().get('cookiesConsent');

  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <div className="order-2 flex flex-1 flex-col gap-5 md:order-1">
        <h1 className="text-2xl font-bold">Ciasteczka</h1>
        {cookiesData.map(({ title, description }) => (
          <div key={title} className="flex flex-col gap-2.5">
            <h2 className="text-xl">{title}</h2>
            {description}
          </div>
        ))}
      </div>
      <div className="order-1 flex flex-1 flex-col gap-5 md:order-2">
        <h1 className="text-2xl font-bold">Opcje Zarządzania Zgodami</h1>
        <p>
          Masz możliwość indywidualnego wyboru, które rodzaje plików cookie chcesz akceptować. Twoje ustawienia możesz
          zmieniać w dowolnym momencie, dostosowując swoje preferencje.
        </p>
        <ConsentSwitches cookiesConsent={cookiesConsent} />
      </div>
    </div>
  );
};

export default Cookies;
