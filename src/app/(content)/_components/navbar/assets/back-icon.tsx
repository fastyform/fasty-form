import { SVGAttributes } from 'react';

const BackIcon = ({ className }: SVGAttributes<SVGSVGElement>) => (
  <svg className={className} height="26" viewBox="0 0 25 26" width="25" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_607_265)">
      <path d="M5.2085 13H19.7918" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
      <path
        d="M5.2085 13L11.4585 19.5"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.25"
      />
      <path d="M5.2085 13L11.4585 6.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
    </g>
    <defs>
      <clipPath id="clip0_607_265">
        <rect fill="white" height="26" width="25" />
      </clipPath>
    </defs>
  </svg>
);
export default BackIcon;
