import { SVGProps } from 'react';

const Lightning = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 56 69" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      clipRule="evenodd"
      d="m23.07 55.957 17.595-21.08h-13.6l7.735-6.8h20.4l-34 40.8 1.87-12.92ZM31.4.877.8 45.077h17l7.82-6.8H13.805L29.53 15.582 31.4.877Z"
      fill="#FACC15"
      fillRule="evenodd"
    />
    <path
      d="m29.53 15.582-2.465 19.295 7.735-6.8 3.4-27.2h-6.8l-1.87 14.705ZM23.07 55.957l2.55-17.68-7.82 6.8-3.4 23.8h6.8l1.87-12.92Z"
      fill="#FEF9C3"
    />
  </svg>
);
export default Lightning;
