import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import Image from 'next/image';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';
import AuthFooter from '@/app/(auth)/_components/auth-footer';
import AppButton from '@/components/app-button';
import Constants from '@/utils/constants';
import Chevron from './_assets/chevron';
import ContactStroke from './_assets/contact-stroke';
import HomeArrow from './_assets/home-arrow';
import './styles.css';
import AmbassadorProgramSection from './_components/ambassador-section';
import { Container } from './_components/container';
import { appBenefits, heroBenefits, stepsData } from './data';

const HomePage = () => (
  <div className="min-h-screen-responsive relative z-0 flex flex-col overflow-x-hidden text-white">
    <HomeArrow className="absolute right-0 z-0 hidden h-auto translate-x-[10%] translate-y-[-16%] xl:block xl:w-[800px] 2xl:w-[1024px]" />
    <Image
      alt={`Aplikacja ${Constants.APP_NAME} - screen shot widoku zgłoszenia aplikacji`}
      className="absolute right-[-150px] top-[100px] z-[1] hidden xl:block xl:w-[850px] 2xl:w-[1036px]"
      height={722}
      src="/home/main-section-mock-desktop.png"
      width={1036}
    />
    <Container className="z-[1] mb-10 pt-10 xl:mb-0 xl:pt-24 2xl:pt-48">
      <Container.Content className="grow flex-col md:grow-0 xl:grow xl:items-start">
        <div className="mb-10 flex max-w-[360px] flex-col gap-5 lg:max-w-[600px] xl:mb-10 xl:max-w-[750px] xl:text-start">
          <h1 className="text-3xl font-bold lg:text-5xl xl:text-6xl">
            Podnieś swoje <span className="text-yellow-400">dochody</span> i zyskaj{' '}
            <span className="text-yellow-400">więcej czasu</span> dla siebie
          </h1>
          <div className="flex flex-col gap-1 text-sm lg:text-base xl:text-xl">
            {heroBenefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 font-medium">
                <CheckCircleOutlineRoundedIcon className="text-yellow-400" />
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <AppButton classes={{ root: 'py-3 xl:px-[40px] xl:text-xl' }} component={Link} href="/register/trainer">
            Zarejestruj się jako trener
          </AppButton>
          <AppButton
            classes={{ root: 'py-3 xl:px-[40px] xl:text-xl' }}
            component={Link}
            href="/register/client"
            variant="outlined"
          >
            Jestem klientem
          </AppButton>
        </div>
      </Container.Content>
    </Container>

    <section className="flex translate-x-12 justify-end md:translate-x-0 md:justify-center xl:hidden">
      <Image
        alt={`Aplikacja ${Constants.APP_NAME} - screen shot widoku zgłoszenia aplikacji`}
        height={600}
        src="/home/main-section-mock.png"
        width={637}
      />
    </section>

    <AmbassadorProgramSection className="2xl:mt-78 z-[1] mt-10 xl:mt-[270px]" />

    <Container>
      <Container.Content className="flex-col gap-10 py-10 lg:gap-14 xl:py-[60px]">
        <h3 className="text-center text-3xl font-bold lg:text-4xl">
          Co Ci daje <span className="font-bold text-yellow-400">{Constants.APP_NAME}</span>?
        </h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {appBenefits.map(([Icon, title, description]) => (
            <div key={title} className="flex flex-col items-center gap-2.5">
              <div className="flex size-[184px] flex-col items-center  justify-center gap-2.5 rounded-full border border-yellow-400 bg-shark p-2 text-base lg:size-60 lg:p-8 lg:text-xl">
                <Icon className="size-12 text-xl lg:size-[70px]" />
                <span className="text-center font-bold">{title}</span>
              </div>
              <p className="max-w-80 text-center" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          ))}
        </div>
      </Container.Content>
    </Container>

    <AmbassadorProgramSection />

    <Container className="z-[1] mt-10 xl:mt-20">
      <Container.Content className="flex-col justify-between gap-10 xl:flex-row xl:items-center xl:gap-0">
        <div className="flex grow flex-col gap-10">
          {stepsData.map(([Number, title, description, className]) => (
            <div key={title} className={twJoin('relative -ml-20 flex sm:translate-x-0 xl:block', className)}>
              <Number className="h-[200px] basis-[231px] opacity-60 sm:h-[230px] xl:h-[330px]" height={330} />
              <div
                key={title}
                className="absolute left-[7.5rem] top-1/2 flex -translate-y-1/2 flex-col gap-2.5  sm:gap-5"
              >
                <p className="text-4xl font-bold xl:text-6xl" dangerouslySetInnerHTML={{ __html: title }} />
                {description && <p className="max-w-96 text-sm xl:text-base">{description}</p>}
              </div>
            </div>
          ))}
        </div>

        <Image
          alt={`${Constants.APP_NAME} - widok onboardingu na iphone`}
          className="xl:self-[unset] w-[241px] self-center xl:w-[337px]"
          height={627}
          quality={100}
          src="/home/iphone-app-onboarding.png"
          width={337}
        />
      </Container.Content>
    </Container>
    <Container className="my-20 mb-4 lg:mb-10 xl:my-36">
      <Container.Content className="items-center justify-center gap-5 sm:gap-8 xl:justify-between">
        <HomeArrow className="hidden h-auto w-6 sm:block sm:w-10 lg:w-16 xl:w-32" />
        <div className="text-sm font-bold uppercase  lg:text-xl xl:text-4xl">analizuj</div>
        <HomeArrow className="h-auto w-6 sm:w-10 lg:w-16 xl:w-32" />
        <div className="text-sm font-bold uppercase  lg:text-xl xl:text-4xl">pomagaj</div>
        <HomeArrow className="h-auto w-6 sm:w-10 lg:w-16 xl:w-32" />
        <div className="text-sm font-bold uppercase  lg:text-xl xl:text-4xl">zarabiaj</div>
        <HomeArrow className="hidden h-auto w-6 sm:block sm:w-10 lg:w-16 xl:w-32" />
      </Container.Content>
    </Container>
    <Container className="z-[2]">
      <Container.Content className="flex-col items-center justify-between xl:flex-row xl:gap-24">
        <div className="relative">
          <Image
            alt={`Widok edytowania profilu ${Constants.APP_NAME}`}
            className="h-[350px] w-full object-cover sm:h-[50vh] xl:h-[450px]"
            height={450}
            quality={100}
            src="/home/section-edit.jpg"
            width={750}
          />
          <div className="section-profile-gradient absolute inset-0 xl:left-[-2px] xl:bg-[linear-gradient(90deg,_rgba(13,17,22,1)_0%,rgba(255,255,255,0)_100%)]" />
        </div>
        <div className="sm:-mt-18 z-[1] -mt-12 flex max-w-sm flex-col	gap-2.5  lg:gap-5 xl:max-w-md">
          <h3 className="text-4xl font-bold md:text-5xl xl:text-6xl">
            Edytuj w <span className="font-bold text-yellow-400">dowolnej</span> chwili
          </h3>
          <p className="text-sm md:text-base">
            Nazwa profilu, cena, oraz zdjęcie - są to elementy, które możesz zmienić w każdej chwili używania aplikacji.
          </p>
        </div>
      </Container.Content>
    </Container>
    <Container className="relative z-[1]  mt-32 bg-yellow-400 px-0 lg:px-5">
      <Container.Content className="relative mt-[-9vw] flex-col gap-5 overflow-x-hidden pb-20 md:-mt-12 lg:mt-0 lg:flex-row lg:items-center lg:justify-center lg:overflow-x-visible lg:pt-20  xl:justify-between">
        <Chevron className="absolute left-[15%] top-0 hidden -translate-y-1/2 xl:block" />
        <Image
          alt="Profil trenera i widok szczegółów zamówienia na Iphone."
          className="w-[135vw] max-w-[unset] md:w-full md:pr-5 lg:hidden"
          height={891}
          quality={100}
          src="/home/section-share.png"
          width={1207}
        />
        <div className="max-w-[350px] px-5 text-shark sm:max-w-md lg:px-0">
          <h3 className="mb-2.5 text-4xl font-bold lg:mb-5 lg:text-5xl xl:text-6xl">
            Ułatw swoim
            <br />
            klientom zakup
          </h3>
          <p className="mb-5 text-sm md:text-base lg:mb-10 lg:font-semibold">
            {`Wrzuć link do swojego profilu ${Constants.APP_NAME} na social media. Pokaż wszystkim, jak możesz pomóc w perfekcyjnym
            wykonywaniu ćwiczeń. Prosto, łatwo i skutecznie!`}
          </p>
          <AppButton
            classes={{ root: 'text-white py-2.5', contained: 'bg-shark' }}
            component={Link}
            href="/register/trainer"
          >
            Zarejestruj konto trenera
          </AppButton>
        </div>
        <Image
          alt="Profil trenera"
          className="z-[1] hidden max-w-xl lg:block xl:max-w-3xl"
          height={815}
          src="/home/section-share-desktop.png"
          width={971}
        />
        <Image
          alt="Widok szczegółów zamówienia analizy techniki"
          className="absolute bottom-0 hidden w-64 translate-y-3/4 lg:left-24 lg:block xl:left-0 xl:w-[319px]"
          height={593}
          quality={100}
          src="/home/iphone-order-details.png"
          width={319}
        />
      </Container.Content>
    </Container>
    <section className="mb-10 flex flex-col items-center gap-20 py-20 lg:mb-20 xl:mb-32 xl:gap-32">
      <Container className="lg:self-stretch">
        <Container.Content className="justify-end">
          <h3 className="max-w-md text-center text-4xl font-bold  lg:max-w-[600px] lg:text-left lg:text-5xl xl:max-w-[700px] xl:text-6xl">
            Po analizie otrzymasz <br /> pieniądze na swoje konto w ciągu
            <span className="text-yellow-400"> 3-7 dni roboczych</span>
          </h3>
        </Container.Content>
      </Container>
      <div className="relative">
        <Image
          alt="Widok wysyłania analizy zgłoszenia"
          className="w-[110vw] max-w-none sm:w-[600px] xl:w-[800px]"
          height={1307}
          src="/home/section-payout.png"
          width={1003}
        />
        <Image
          alt=""
          className="absolute left-1/2 top-1/2 z-[-1] hidden max-w-[2800px] -translate-x-1/2 -translate-y-1/2 md:block md:w-[140vw] xl:w-[130vw]"
          height={508}
          src="/home/section-payout-bg.png"
          width={1796}
        />
      </div>
    </section>
    <Container className="relative bg-yellow-400 pb-20 pt-20 md:pb-0 lg:pt-32">
      <ContactStroke className="absolute top-0 h-[clamp(75px,10vw,240px)] w-full -translate-y-1/2" />
      <Container.Content className="items-center sm:justify-center md:justify-between">
        <div className="hidden h-[300px] overflow-hidden md:block lg:h-[500px]">
          <HomeArrow className="h-auto w-[300px] lg:w-[480px] xl:w-[580px] [&_path]:fill-bunker" />
        </div>
        <div className="max-w-sm text-bunker lg:max-w-[26rem] xl:max-w-[39rem]">
          <h3 className="mb-2.5 text-4xl font-bold lg:mb-5 lg:text-5xl xl:text-6xl">{`Tworzymy ${Constants.APP_NAME} z myślą o Tobie`}</h3>
          <p className="mb-5 text-sm lg:mb-10 xl:text-base xl:font-semibold">
            Twoje opinie i pomysły są dla nas kluczowe. Czekamy na Twoje sugestie dotyczące nowych funkcjonalności i
            jesteśmy tu, aby odpowiadać na pytania oraz rozwiązywać problemy. Razem ulepszajmy naszą aplikację.
          </p>
          <AppButton classes={{ root: 'text-white py-2.5', contained: 'bg-shark ' }} component={Link} href="/contact">
            Skontaktuj się z nami
          </AppButton>
        </div>
      </Container.Content>
    </Container>
    <Container>
      <Container.Content className="gap-5 py-5 ">
        <AuthFooter shouldNavigateBack />
      </Container.Content>
    </Container>
  </div>
);

export default HomePage;
