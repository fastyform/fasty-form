import { APP_FEE } from '@/app/(stripe)/stripe/_utils/calculate-fees';
import Constants from '@/utils/constants';

const tosData = {
  Wstęp: [
    'Niniejszy Regulamin określa zasady korzystania z Aplikacji.',
    'Aplikacja jest własnością Właściciela, jak zdefiniowano powyżej.',
    `Aplikacja działa jako platforma pośrednicząca między trenerami personalnymi a użytkownikami, mająca na celu umożliwienie użytkownikom zakupu usług weryfikacji techniki ćwiczeń na podstawie wideo. ${Constants.APP_NAME} nie jest dostawcą tych usług, lecz narzędziem umożliwiającym ich świadczenie.`,
    'Korzystanie z Aplikacji oznacza akceptację postanowień niniejszego Regulaminu.',
  ],
  'Rejestracja i konto użytkownika': [
    'Aby korzystać z pełnej funkcjonalności Aplikacji, należy zarejestrować konto użytkownika.',
    'Podczas rejestracji użytkownik jest zobowiązany do podania prawdziwych i aktualnych danych.',
    'Dodawanie zdjęcia profilowego jest opcjonalne. Jeśli użytkownik zdecyduje się dodać zdjęcie profilowe, będzie ono przechowywane na naszych serwerach i widoczne dla wszystkich użytkowników Aplikacji.',
    'Użytkownik wyraża zgodę na otrzymywanie komunikacji e-mailowej niezbędnej do świadczenia usług przez Aplikację, w tym powiadomień dotyczących konta, transakcji, aktualizacji usług oraz innych ważnych informacji związanych z użytkowaniem aplikacji.',
    'Podczas procesu rejestracji, użytkownik może wyrazić zgodę na otrzymywanie informacji o promocjach, poradach, i nowościach drogą mailową poprzez zaznaczenie opcjonalnego checkboxa. Zgoda ta może być w każdej chwili cofnięta przez użytkownika.',
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
    'Właściciel Aplikacji nie ponosi odpowiedzialności za opóźnienia w przetwarzaniu płatności przez zewnętrzne systemy płatności.',
    `W ramach naszej aplikacji pobieramy prowizję w wysokości ${
      APP_FEE * 100
    }% od każdej transakcji. Dodatkowo, opłaty związane z przetwarzaniem płatności są naliczane zgodnie z cennikiem Stripe, na co składają się zarówno procentowa stawka jak i stała opłata za transakcję. Szczegółowe informacje na temat prowizji Stripe można znaleźć, odwiedzając <a class="text-yellow-400" href="https://stripe.com/en-pl/pricing">link do prowizji Stripe</a>. Nasza prowizja jest naliczana jako opłata za korzystanie z platformy, która służy jako narzędzie pośredniczące między użytkownikami.`,
    'Kwota prowizji jest automatycznie odliczana od wynagrodzenia należnego trenerowi za świadczone usługi.',
    'Właściciel Aplikacji zastrzega sobie prawo do zmiany stawki prowizji, zgodnie z postanowieniem 15.1 Regulaminu.',
    'Minimalna kwota do wypłaty wynagrodzenia dla trenera przez system płatności Stripe wynosi 5 zł. Wypłaty poniżej tej kwoty będą akumulowane, dopóki łączna suma do wypłaty nie przekroczy minimalnej kwoty wymaganej.',
    `Usługi przetwarzania płatności dla Trenerów (Użytkownicy zakładający konto Trenera) na ${Constants.APP_NAME} są świadczone przez Stripe i podlegają <a class="text-yellow-400" href="https://stripe.com/en-pl/legal/connect-account">Umowie Stripe Connected Account Agreement</a>, która obejmuje <a class="text-yellow-400" href="https://stripe.com/en-pl/legal/ssa">Stripe Terms of Service</a> (razem  "Stripe Services Agreement"). Wyrażając zgodę na niniejsze warunki lub kontynuując działalność jako Trener (Użytkownik zakładający konto Trenera) na ${Constants.APP_NAME}, użytkownik wyraża zgodę na przestrzeganie Umowy "Stripe Services Agreement", która może być okresowo modyfikowana przez Stripe. Warunkiem udostępnienia przez ${Constants.APP_NAME} usług przetwarzania płatności za pośrednictwem Stripe jest wyrażenie zgody na przekazanie ${Constants.APP_NAME} dokładnych i pełnych informacji o użytkowniku i jego działalności oraz upoważnienie ${Constants.APP_NAME} do udostępniania tych informacji i informacji o transakcjach związanych z korzystaniem przez użytkownika z usług przetwarzania płatności świadczonych przez Stripe.`,
    'W przypadku konta trenera, aplikacja wymaga podania dodatkowych informacji osobistych w celu przetwarzania płatności przez system Stripe. Dla osób fizycznych jest to imię i nazwisko, natomiast dla firm – NIP oraz adres firmy. Zebrane dane są wykorzystywane do wygenerowania paragonów Stripe, na których, w zależności od statusu trenera (osoba fizyczna lub firma), wyświetlane są odpowiednio imię i nazwisko trenera lub NIP i adres firmy.',
  ],
  'Komunikacja Marketingowa': [
    'Użytkownik, który wyraził zgodę na otrzymywanie informacji marketingowych, zgadza się na otrzymywanie od Właściciela Aplikacji, drogą mailową, informacji o promocjach, poradach i nowościach związanych z Aplikacją.',
    'Użytkownik ma możliwość w każdej chwili wycofania zgody na otrzymywanie informacji marketingowych poprzez zmianę ustawień w zakładce powiadomień w aplikacji lub poprzez kliknięcie linku do rezygnacji znajdującego się w stopce każdego e-maila marketingowego.',
  ],
  'Prawa autorskie i użytkowanie materiałów wideo': [
    'Wszystkie materiały przesłane przez użytkowników pozostają ich własnością intelektualną. Aplikacja oraz trenerzy mogą wykorzystywać te materiały wyłącznie w celu świadczenia usług analizy.',
    'Użytkownik udziela Aplikacji niewyłącznego, bezterminowego prawa do korzystania z przesłanych materiałów wideo w ramach działalności Aplikacji.',
    'Użytkownik, wysyłając materiał wideo w celu weryfikacji techniki, wyraża zgodę na przetwarzanie swojego wizerunku przez trenera wyłącznie w celu świadczenia usługi analizy techniki ćwiczeń.',
  ],
  'Zasady anulowania i zmiany zamówień': [
    'Użytkownik ma prawo anulować zamówienie na usługi trenera, jeżeli usługa nie została jeszcze rozpoczęta. Aby anulować zamówienie, użytkownik musi skontaktować się z naszym działem pomocy za pośrednictwem oficjalnych kanałów komunikacji podanych w aplikacji.',
    `Prośba o anulowanie zostanie rozpatrzona przez ${Constants.APP_NAME} w ciągu 48 godzin od momentu otrzymania. W przypadku potwierdzenia, że usługa nie została jeszcze rozpoczęta przez trenera, zamówienie zostanie anulowane, a użytkownikowi zostaną zwrócone pełne środki za niezrealizowaną usługę.`,
    `W przypadku, gdy użytkownik złoży prośbę o anulowanie zamówienia, ale trener rozpocznie realizację usługi przed przetworzeniem tej prośby przez ${Constants.APP_NAME}, zamówienie nie zostanie anulowane, a płatność nie podlega zwrotowi. Użytkownik zostanie poinformowany o statusie zamówienia oraz o tym, że usługa jest w trakcie realizacji lub została zakończona.`,
    `${Constants.APP_NAME} dokłada wszelkich starań, aby prośby o anulowanie były przetwarzane w możliwie najkrótszym czasie, jednakże nie gwarantuje anulowania zamówienia, jeśli trener rozpocznie jego realizację przed przetworzeniem prośby o anulowanie przez ${Constants.APP_NAME}.`,
    'Szczegóły dotyczące procesu anulowania i zmiany zamówień można znaleźć kontaktując się z naszym działem pomocy.',
  ],
  'Prawa i obowiązki użytkownika': [
    'Użytkownik zobowiązany jest do korzystania z Aplikacji zgodnie z prawem i dobrymi obyczajami.',
    'Użytkownik ponosi odpowiedzialność za treść przesyłanych materiałów wideo.',
  ],
  'Prawa i obowiązki trenera': [
    'Trener zobowiązany jest do profesjonalnej i rzetelnej analizy przesłanych materiałów.',
    'Trener ma prawo ustalić cenę swoich usług.',
    'Trener zobowiązuje się do zachowania poufności i ochrony danych osobowych użytkowników, w tym nieudostępniania przesłanych materiałów wideo oraz informacji o użytkownikach osobom trzecim bez wyraźnej zgody użytkownika.',
  ],
  'Ochrona danych osobowych': [
    'Aplikacja przetwarza dane osobowe użytkowników zgodnie z obowiązującymi przepisami o ochronie danych osobowych.',
    'Szczegółowe informacje dotyczące przetwarzania danych osobowych, w tym środków bezpieczeństwa i praw użytkownika, znajdują się w naszej Polityce Prywatności.',
  ],
  Odpowiedzialność: [
    'Właściciel nie ponosi odpowiedzialności za działania użytkowników oraz treści przez nich przesyłanych.',
    'Aplikacja dostarczana jest "jak jest", bez gwarancji działania bez błędów.',
    'Właściciel oraz trenerzy nie ponoszą odpowiedzialności za ewentualne szkody wynikające z niewłaściwego stosowania porad lub analiz trenerów.',
    'Użytkownik ponosi pełną odpowiedzialność za wszelkie przesłane materiały, które naruszają prawa osób trzecich, w tym prawa autorskie, prawa do znaków towarowych, prawo do prywatności lub inne prawa własności intelektualnej lub osobiste. Właściciel Aplikacji nie jest odpowiedzialny za treści przesyłane przez użytkowników, ale zobowiązuje się do działania w ramach obowiązujących przepisów w przypadku otrzymania powiadomienia o możliwym naruszeniu.',
  ],
  'Zwroty pieniędzy': [
    'Użytkownik ma prawo do złożenia wniosku o zwrot pieniędzy w przypadku, gdy usługa nie została wykonana zgodnie z umową lub posiada istotne wady.',
    'Wniosek o zwrot pieniędzy musi zostać złożony w terminie 14 dni od daty zakupu usługi.',
    'Decyzja o zwrocie pieniędzy będzie podejmowana przez Właścicieli na podstawie indywidualnej oceny każdego przypadku.',
    'W przypadku akceptacji wniosku, zwrot zostanie przekazany na konto użytkownika w przybliżeniu 5-10 dni roboczych od daty akceptacji wniosku. ',
    'Właściciel Aplikacji nie ponosi odpowiedzialności za opóźnienia w przetwarzaniu zwrotów przez zewnętrzne systemy płatności.',
    'Użytkownik, dokonując zakupu usługi weryfikacji techniki ćwiczeń na podstawie wideo, rezygnuje z prawa do odstąpienia od umowy po wykonaniu usługi przez trenera, zgodnie z art. 38 pkt 13 ustawy o prawach konsumenta, ponieważ usługa ta polega na wykonywaniu czynności na wyraźne żądanie konsumenta przed upływem terminu do odstąpienia od umowy.',
  ],
  'Konta trenerów i dodanie do bazy trenerów': [
    'Użytkownicy rejestrujący się w Aplikacji jako trenerzy wyrażają zgodę na dodanie swoich kont do publicznie dostępnej bazy trenerów.',
    'Dane udostępnione w bazie trenerów będą ograniczone do nazwy profilu i ceny usług trenera.',
    'Właściciel zastrzega sobie prawo do automatycznego dodawania kont trenerów do bazy, w celu promowania ich usług w ramach Aplikacji.',
    'Trenerzy mogą w każdej chwili zaktualizować lub zmodyfikować swoje dane w bazie trenerów za pośrednictwem swojego konta użytkownika.',
  ],
  'Odpowiedzialność podatkowa trenerów': [
    'Trenerzy zarejestrowani w Aplikacji jako dostawcy usług są odpowiedzialni za wszelkie kwestie podatkowe wynikające z ich działalności, w tym za deklarowanie i odprowadzanie odpowiednich podatków, księgowość i ewidencjonowanie przychodów zgodnie z obowiązującymi przepisami prawa podatkowego.',
    'Właściciel Aplikacji nie bierze na siebie odpowiedzialności za rozliczenia podatkowe trenerów.',
    'Trenerzy powinni samodzielnie zapewnić, że ich działalność jest zgodna z lokalnymi przepisami podatkowymi, w tym dokonywać odpowiednich zgłoszeń i płatności podatkowych.',
    'Właściciel Aplikacji nie świadczy doradztwa podatkowego i zaleca trenerom skonsultowanie się z odpowiednimi specjalistami w celu uzyskania porady podatkowej.',
  ],
  'Wymagania wiekowe': [
    'Korzystanie z Aplikacji jest dozwolone wyłącznie dla osób, które ukończyły 18 rok życia. Osoby niepełnoletnie mogą korzystać z Aplikacji wyłącznie pod nadzorem opiekunów prawnych.',
  ],
  'Zmiany w regulaminie': [
    'Właściciel zastrzega sobie prawo do wprowadzania zmian w Regulaminie. Użytkownicy zostaną poinformowani o wszelkich zmianach poprzez komunikaty w Aplikacji lub za pośrednictwem email.',
  ],
  'Postępowanie w przypadku naruszeń': [
    'W przypadku naruszenia przez użytkownika postanowień Regulaminu, Właściciel może podjąć odpowiednie działania, w tym czasowe zawieszenie lub trwałe usunięcie konta użytkownika.',
  ],
  'Postanowienia końcowe': [
    'Wszelkie spory wynikające z korzystania z Aplikacji będą rozstrzygane zgodnie z prawem polskim.',
    'Regulamin wchodzi w życie z dniem 01.01.2024.',
  ],
};

export default tosData;
