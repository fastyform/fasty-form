import { HTMLAttributes } from 'react';

const HowItWorksVideo = (props: HTMLAttributes<HTMLIFrameElement>) => (
  <iframe
    allowFullScreen
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    className="aspect-video w-full"
    referrerPolicy="strict-origin-when-cross-origin"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=YxjKIE9hO0PGELko"
    title="YouTube video player"
    {...props}
  />
);

export default HowItWorksVideo;
