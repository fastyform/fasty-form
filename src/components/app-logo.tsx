import Image from 'next/image';

const AppLogo = () => (
  <Image
    alt="FastForm logo"
    className="place-self-center self-center object-contain"
    height={43}
    src="/logo.png"
    width={120}
  />
);

export default AppLogo;
