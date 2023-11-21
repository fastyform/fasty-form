import Image from 'next/image';

const LoadingTrainerProfilePage = () => (
  <div className="flex grow items-end min-[800px]:items-center">
    <div className="animation-pulse fixed right-0 top-0 z-0 aspect-[1/2] h-full max-w-full">
      <Image fill alt="Placeholder image" className=" object-contain" src="/image-placeholder.png" />
    </div>
    <div className="relative z-20 flex w-full max-w-sm flex-col gap-10 lg:max-w-2xl xl:max-w-4xl">
      <div className="flex flex-col gap-2.5">
        <div className="animation-pulse w-fit select-none rounded-full bg-[#1e2226] text-2xl font-bold min-[800px]:text-6xl xl:text-8xl">
          <span className="invisible">Imię nazwisko</span>
        </div>
        <div className=" animation-pulse w-fit select-none rounded-full bg-[#1e2226] text-base lg:text-xl">
          <span className="invisible">
            Analiza techniki jednego wideo - <span className="font-bold">11zł</span>
          </span>
        </div>
      </div>
      <div className="w-full max-w-sm animate-pulse select-none rounded-full bg-yellow-400 py-[18px] text-center text-base font-bold text-yellow-400 lg:text-base">
        Kup analizę techniki
      </div>
    </div>
  </div>
);

export default LoadingTrainerProfilePage;
