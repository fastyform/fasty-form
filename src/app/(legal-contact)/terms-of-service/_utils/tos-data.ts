const tosData = {
  Wstęp: [
    'Niniejszy Regulamin określa zasady korzystania z Aplikacji.',
    'Aplikacja jest własnością Właścicieli, jak zdefiniowano powyżej.',
    'Korzystanie z Aplikacji oznacza akceptację postanowień niniejszego Regulaminu.',
  ],
  'Rejestracja i konto użytkownika': [
    'Aby korzystać z pełnej funkcjonalności Aplikacji, należy zarejestrować konto użytkownika.',
    'Podczas rejestracji użytkownik jest zobowiązany do podania prawdziwych i aktualnych danych.',
    'Dodawanie zdjęcia profilowego jest opcjonalne. Jeśli użytkownik zdecyduje się dodać zdjęcie profilowe, będzie ono przechowywane na naszych serwerach i widoczne dla wszystkich użytkowników Aplikacji.',
  ],
  'Bezpieczeństwo i odpowiedzialność za konto': [
    'Użytkownik jest odpowiedzialny za zachowanie poufności swoich danych logowania.',
    'W przypadku podejrzenia nieautoryzowanego dostępu do konta, użytkownik jest zobowiązany do niezwłocznego poinformowania o tym fakcie administracji Aplikacji.',
    'Zalecamy regularną zmianę haseł i użycie silnych kombinacji znaków, aby zwiększyć bezpieczeństwo konta.',
  ],

  'Usługi i płatności': [
    'Aplikacja umożliwia zakup analiz wideo od trenerów.',
    'Płatności za usługi realizowane są za pośrednictwem systemu płatności Stripe.',
    'Po dokonaniu płatności użytkownik może przesłać materiał wideo wraz z opcjonalnymi uwagami.',
    'Po zakończonej i ocenionej przez trenera analizie wideo, przysługujące trenerowi wynagrodzenie jest automatycznie wypłacane.',
    'Czas dostępności środków zależy od dostawcy usług płatniczych i może wynosić od 3 do 7 dni. Po tym okresie środki są automatycznie przelewane na konto bankowe trenera.',
    'Właściciele Aplikacji nie ponoszą odpowiedzialności za opóźnienia w przetwarzaniu płatności przez zewnętrzne systemy płatności.',
    'Prowizja naliczana przez Właścicieli Aplikacji od każdej transakcji jest obliczana według następującego wzoru: [cena usługi ustalona przez trenera] * 0.02 + 1 PLN.',
    'Kwota prowizji jest automatycznie odliczana od wynagrodzenia należnego trenerowi za świadczone usługi.',
    'Właściciele Aplikacji zastrzegają sobie prawo do zmiany stawki prowizji, zgodnie z postanowieniem 15.1 Regulaminu.',
  ],
  'Prawa autorskie i użytkowanie materiałów wideo': [
    'Wszystkie materiały przesłane przez użytkowników pozostają ich własnością intelektualną. Aplikacja oraz trenerzy mogą wykorzystywać te materiały wyłącznie w celu świadczenia usług analizy.',
    'Użytkownik udziela Aplikacji niewyłącznego, bezterminowego prawa do korzystania z przesłanych materiałów wideo w ramach działalności Aplikacji.',
  ],
  'Zasady anulowania i zmiany zamówień': [
    'Użytkownik ma prawo anulować lub zmienić zamówienie na usługi trenera przed rozpoczęciem ich realizacji. Szczegóły dotyczące procesu dowiesz się kontatując się z naszym działem pomocy.',
  ],
  'Prawa i obowiązki użytkownika': [
    'Użytkownik zobowiązany jest do korzystania z Aplikacji zgodnie z prawem i dobrymi obyczajami.',
    'Użytkownik ponosi odpowiedzialność za treść przesyłanych materiałów wideo.',
  ],
  'Prawa i obowiązki trenera': [
    'Trener zobowiązany jest do profesjonalnej i rzetelnej analizy przesłanych materiałów.',
    'Trener ma prawo ustalić cenę swoich usług.',
  ],
  'Ochrona danych osobowych': [
    'Aplikacja przetwarza dane osobowe użytkowników zgodnie z obowiązującymi przepisami o ochronie danych osobowych.',
    'Szczegółowe informacje dotyczące przetwarzania danych osobowych, w tym środków bezpieczeństwa i praw użytkownika, znajdują się w naszej Polityce Prywatności.',
  ],
  Odpowiedzialność: [
    'Właściciele nie ponoszą odpowiedzialności za działania użytkowników oraz treści przez nich przesyłanych.',
    'Aplikacja dostarczana jest "jak jest", bez gwarancji działania bez błędów.',
    'Właściciele oraz trenerzy nie ponoszą odpowiedzialności za ewentualne szkody wynikające z niewłaściwego stosowania porad lub analiz trenerów.',
  ],
  'Zwroty pieniędzy': [
    'Użytkownik ma prawo do złożenia wniosku o zwrot pieniędzy w przypadku, gdy usługa nie została wykonana zgodnie z umową lub posiada istotne wady.',
    'Wniosek o zwrot pieniędzy musi zostać złożony w terminie 14 dni od daty zakupu usługi.',
    'Decyzja o zwrocie pieniędzy będzie podejmowana przez Właścicieli na podstawie indywidualnej oceny każdego przypadku.',
    'W przypadku akceptacji wniosku, zwrot zostanie przekazany na konto użytkownika w ciągu 90 dni od daty akceptacji wniosku.',
  ],
  'Konta trenerów i dodanie do bazy trenerów': [
    'Użytkownicy rejestrujący się w Aplikacji jako trenerzy wyrażają zgodę na dodanie swoich kont do publicznie dostępnej bazy trenerów.',
    'Dane udostępnione w bazie trenerów będą ograniczone do nazwy profilu i ceny usług trenera.',
    'Właściciele zastrzegają sobie prawo do automatycznego dodawania kont trenerów do bazy, w celu promowania ich usług w ramach Aplikacji.',
    'Trenerzy mogą w każdej chwili zaktualizować lub zmodyfikować swoje dane w bazie trenerów za pośrednictwem swojego konta użytkownika.',
  ],
  'Odpowiedzialność podatkowa trenerów': [
    'Trenerzy zarejestrowani w Aplikacji są odpowiedzialni za wszelkie kwestie podatkowe wynikające z ich działalności, w tym za deklarowanie i odprowadzanie odpowiednich podatków zgodnie z obowiązującymi przepisami prawa podatkowego.',
    'Właściciele Aplikacji nie biorą na siebie odpowiedzialności za rozliczenia podatkowe trenerów.',
    'Trenerzy powinni samodzielnie zapewnić, że ich działalność jest zgodna z lokalnymi przepisami podatkowymi, w tym dokonywać odpowiednich zgłoszeń i płatności podatkowych.',
    'Właściciele Aplikacji nie świadczą doradztwa podatkowego i zalecają trenerom skonsultowanie się z odpowiednimi specjalistami w celu uzyskania porady podatkowej.',
  ],
  'Wymagania wiekowe': [
    'Korzystanie z Aplikacji jest dozwolone wyłącznie dla osób, które ukończyły 18 rok życia. Osoby niepełnoletnie mogą korzystać z Aplikacji wyłącznie pod nadzorem opiekunów prawnych.',
  ],
  'Zmiany w regulaminie': [
    'Właściciele zastrzegają sobie prawo do wprowadzania zmian w Regulaminie. Użytkownicy zostaną poinformowani o wszelkich zmianach poprzez komunikaty w Aplikacji lub za pośrednictwem email.',
  ],
  'Postępowanie w przypadku naruszeń': [
    'W przypadku naruszenia przez użytkownika postanowień Regulaminu, Właściciele mogą podjąć odpowiednie działania, w tym czasowe zawieszenie lub trwałe usunięcie konta użytkownika.',
  ],
  'Postanowienia końcowe': [
    'Wszelkie spory wynikające z korzystania z Aplikacji będą rozstrzygane zgodnie z prawem polskim.',
    'Regulamin wchodzi w życie z dniem 12.12.2026.',
  ],
};

export default tosData;
