import Constants from '@/utils/constants';
import CrossedCard from './_assets/benefits/crossed-card';
import CrossedTimer from './_assets/benefits/crossed-timer';
import Diamond from './_assets/benefits/diamond';
import FullCalendar from './_assets/benefits/full-calendar';
import Income from './_assets/benefits/income';
import Lightning from './_assets/benefits/lightning';
import One from './_assets/one';
import Three from './_assets/three';
import Two from './_assets/two';
import './styles.css';

export const stepsData = [
  [
    One,
    'Załóż konto <br/> <span class="text-yellow-400">trenera</span> bez <br/> żadnych opłat.',
    `Założenie konta w ${Constants.APP_NAME} jest w pełni darmowe. Pobieramy jedynie niewielką prowizję od każdej płatności.`,
    'sm:ml-0',
  ],
  [
    Two,
    '<span class="text-yellow-400">Wypełnij</span> dane <br/> na profilu',
    'Wybierz nazwę swojego profilu, cenę, oraz zdjęcie profilowe, które możesz zmienić w dowolnym momencie.',
    'sm:ml-[10vw] xl:ml-[8vw]',
  ],
  [
    Three,
    '<span class="text-yellow-400">Podziel</span> się <br/> swoim profilem',
    `Wrzuć link do Twojego profilu ${Constants.APP_NAME} na Twoich social mediach - niech ludzie zobaczą, co masz do zaoferowania!`,
    'sm:ml-[20vw] xl:ml-[16vw]',
  ],
] as const;

export const heroBenefits = [
  'Dodatkowe źródło zarobków',
  'Proste narzędzie do analizy wideo',
  'Oszczędność czasu i organizacja pracy',
] as const;

export const appBenefits = [
  [
    Income,
    'Nowe źródło dochodu',
    '<strong>Zwiększ dochody nawet o 30%</strong>, oferując weryfikację techniki online, bez dodatkowego czasu w pracy.',
  ],
  [
    FullCalendar,
    'Gdy nie masz miejsc na treningi',
    'Oferuj weryfikację techniki, <strong>kiedy brakuje Ci miejsca</strong> na więcej treningów personalnych lub prowadzenie online.',
  ],
  [
    CrossedTimer,
    'Idealne dla zapracowanych',
    'Minimalny wysiłek. Idealne rozwiązanie <strong>dla trenerów z ograniczonym czasem</strong> mających wiele na głowie.',
  ],
  [
    Lightning,
    'Szybka i intuicyjna ocena',
    '<strong>Oszczędzaj czas</strong>, przeprowadzając weryfikację techniki w <strong>mniej niż 3 minuty</strong> dzięki naszej aplikacji.',
  ],
  [
    Diamond,
    'Unikatowa usługa w ofercie',
    `<strong>Wyróżnij się na rynku</strong>, wprowadzając <strong>innowacyjną usługę</strong> weryfikacji techniki, dostępną tylko dzięki ${Constants.APP_NAME}.`,
  ],
  [
    CrossedCard,
    'Dostępne dla każdego budżetu',
    'Uczyń swoją  <strong>ofertę dostępną dla szerszej grupy klientów</strong>, którzy nie mogą sobie pozwolić na treningi z Tobą.',
  ],
] as const;
