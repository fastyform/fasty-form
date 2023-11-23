import OnboardingForm from '@/app/(content)/onboarding/_components/onboarding-form/onboarding-form';

const OnboardingPage = () => (
  <section className="my-5 flex w-full flex-col gap-5">
    <h1 className="text-2xl font-bold text-white md:text-3xl">Wypełnij swoje dane</h1>
    <p className="text-white">Aby zacząć korzystać z portalu, prosimy o wypełnienie obowiązkowych pól.</p>
    <OnboardingForm />
  </section>
);

export default OnboardingPage;
