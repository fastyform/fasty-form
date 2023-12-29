import Image from 'next/image';

const SubmissionCardImageFallback = () => (
  <Image fill alt="Brak miniaturki zgłoszenia" className="rounded-xl object-contain" src="/image-placeholder.png" />
);

export default SubmissionCardImageFallback;
