const NotificationsPage = () => (
  <div className="flex flex-col gap-4">
    <h1 className="text-2xl font-bold">Domyślne ustawienia powiadomień</h1>
    <div className="flex flex-col gap-2">
      <h2>Dodatkowe powiadomienia</h2>
      <ul className="list-inside list-disc">
        {[
          'Porady i wskazówki do lepszego korzystania z aplikacji',
          'Promocje specjalne, dzięki którym użytkownik może uzytkownik może zaoszczędzić',
          'Nowości o aktualizacjach i nowych funkcjach.',
        ].map((bulletPoint) => (
          <li key={bulletPoint}>{bulletPoint}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default NotificationsPage;
