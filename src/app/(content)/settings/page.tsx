import SettingsMenu from './_components/settings-menu';

const SettingsPage = async () => (
  <div className="flex lg:gap-10 xl:gap-20 2xl:gap-40">
    <div className="w-full lg:max-w-[350px]">
      <h1 className="text-2xl text-white">Ustawienia</h1>
      <SettingsMenu />
    </div>
  </div>
);

export default SettingsPage;
