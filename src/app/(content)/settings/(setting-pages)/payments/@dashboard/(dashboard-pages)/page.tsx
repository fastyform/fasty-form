import AccountBalance from './account-balance';

const DashboardBalance = () => (
  <div className="flex flex-col gap-8">
    <div className="flex max-w-lg flex-col gap-2.5 text-white">
      <h2 className="text-2xl font-semibold">Twoje saldo</h2>
      <p>
        Wypłata na konto bankowe trafia zazwyczaj w 3 do 7 dni roboczych po zakończonej i ocenionej przez Ciebie
        analizie wideo.
      </p>
    </div>
    <AccountBalance />
  </div>
);

export default DashboardBalance;
