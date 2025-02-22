import SubmissionPartWithIcon from './_components/submission-part-with-icon';

export const VideoSkeleton = () => (
  <div className="aspect-video animate-pulse rounded-xl bg-shark lg:order-2 lg:h-80 xl:h-96" />
);

const LoadingSubmissionPage = () => (
  <div className="flex flex-col gap-5 lg:flex-row lg:gap-10 xl:gap-40">
    <div className="w-fit animate-pulse select-none rounded-xl bg-shark text-base lg:hidden">
      <span className="invisible font-bold">Ostatnia zmiana: </span>
      <span className="invisible">Sobota 20:42</span>
    </div>
    <div className="w-fit animate-pulse select-none rounded-xl bg-shark text-base lg:hidden">
      <span className="invisible">Trener: </span>
      <span className="invisible font-bold">Jan Kowalski</span>
    </div>
    <VideoSkeleton />
    <div className="flex flex-col gap-5 lg:order-1 lg:grow">
      <SubmissionPartWithIcon verticalLine icon="submission">
        <div className="invisible animate-pulse select-none rounded-xl bg-shark text-lg font-bold leading-5">
          Zgłoszenie klienta
        </div>
        <div className="h-40 animate-pulse rounded-xl bg-shark" />
      </SubmissionPartWithIcon>
      <SubmissionPartWithIcon verticalLine icon="description">
        <div className="invisible animate-pulse select-none rounded-xl bg-shark text-lg font-bold leading-5">
          Twoja odpowiedź
        </div>
        <div className="h-40 animate-pulse rounded-xl bg-shark" />
      </SubmissionPartWithIcon>
    </div>
  </div>
);

export default LoadingSubmissionPage;
