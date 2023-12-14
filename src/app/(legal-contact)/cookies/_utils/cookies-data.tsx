import Link from 'next/link';

const cookiesData = [
  {
    title: 'Szczegółowy Opis Rodzajów Plików Cookie',
    description: (
      <>
        <p>
          <strong>1. Ściśle Niezbędne Pliki Cookie:</strong>
          <br />
          Te pliki cookie są wymagane do funkcjonowania naszej strony i nie mogą być wyłączone. Umożliwiają podstawowe
          funkcje, takie jak nawigacja po stronie i dostęp do bezpiecznych obszarów. Przechowujemy pliki cookie ściśle
          niezbędne przez czas niezbędny do funkcjonowania strony, a pliki cookie analityczne są przechowywane przez
          okres nieokreślony, zgodnie z naszymi zasadami prywatności.
        </p>
        <p>
          <strong>2. Pliki Cookie Google Analytics:</strong>
          <br />
          Używamy Google Analytics do analizowania ruchu na stronie i poprawy naszych usług. Dane są zbierane anonimowo
          i obejmują informacje takie jak liczba odwiedzających i sposoby korzystania ze strony.
        </p>
        <p>
          <strong>3. Pliki Cookie Hotjar:</strong>
          <br />
          Hotjar pomaga nam zrozumieć zachowania użytkowników na stronie poprzez mapowanie kliknięć i interakcji. Dane
          zbierane są anonimowo.
        </p>
      </>
    ),
  },
  {
    title: 'Polityka Prywatności i Pliki Cookie',
    description: (
      <p>
        Nasza Polityka Prywatności zawiera więcej szczegółów na temat sposobu, w jaki przetwarzamy dane osobowe, w tym
        dane zbierane przez pliki cookie.
        <br />
        <br />
        Zapraszamy do zapoznania się z naszą{' '}
        <Link className="text-yellow-400" href="/privacy-policy">
          Polityką Prywatności
        </Link>
        . Jeśli masz pytania, możesz się z nami{' '}
        <Link className="text-yellow-400" href="/contact">
          skontaktować
        </Link>
        .
      </p>
    ),
  },
  {
    title: 'Instrukcje dotyczące Wyłączania Plików Cookie w Przeglądarce',
    description: (
      <p>
        Możesz wyłączyć pliki cookie w swojej przeglądarce internetowej, jednak może to wpłynąć na funkcjonalność
        strony. Więcej informacji na ten temat znajdziesz w ustawieniach przeglądarki.
      </p>
    ),
  },
  {
    title: 'Aktualizacje i Zmiany w Polityce Plików Cookie',
    description: (
      <p>
        Nasza polityka plików cookie może być aktualizowana. Zachęcamy do regularnego odwiedzania tej strony, aby być na
        bieżąco z wszelkimi zmianami. O wszelkich zmianach będziemy informować poprzez naszą stronę internetową oraz
        komunikaty w aplikacji.
      </p>
    ),
  },
  {
    title: 'Kontakt w Sprawie Prywatności i Plików Cookie',
    description: (
      <p>
        Jeśli masz jakiekolwiek pytania lub obawy dotyczące naszej polityki plików cookie lub prywatności,{' '}
        <Link className="text-yellow-400" href="/contact">
          skontaktuj się z nami
        </Link>
        .
      </p>
    ),
  },
];

export default cookiesData;
