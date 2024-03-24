import Script from 'next/script';
import CookiesDeclaration from './cookies-declaration';

const Cookies = () => (
  <div className="flex flex-col gap-10 md:flex-row">
    <div className="order-2 flex flex-1 flex-col gap-5 md:order-1">
      <h1 className="text-2xl font-bold">Ciasteczka</h1>
      <Script src="https://consent.cookiebot.com/uc.js?cbid=af9bc4d6-f7c9-4a4d-8b4f-3ace3e37cf8f" />
      <CookiesDeclaration />
    </div>
  </div>
);

export default Cookies;
