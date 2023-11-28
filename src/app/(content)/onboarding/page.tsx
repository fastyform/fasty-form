import OnboardingForm from '@/app/(content)/onboarding/_components/onboarding-form/onboarding-form';

const OnboardingPage = () => (
  <section className="mx-auto my-5 flex w-[500px] max-w-full flex-col gap-10">
    <div className="flex flex-col gap-2.5 text-white  min-[500px]:text-center">
      <h1 className="text-2xl font-bold md:text-3xl">Wypełnij swoje dane</h1>
      <p className=" text-xl">Aby zacząć korzystać z portalu, prosimy o wypełnienie obowiązkowych pól.</p>
    </div>
    <OnboardingForm />
  </section>
);

export default OnboardingPage;
