import { SVGProps } from 'react';

const ErrorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" height={17} viewBox="0 0 17 17" width={17} xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)" stroke="#F87171" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
      <path d="M8.5 6.375v2.833M7.34 2.544 1.6 12.13a1.356 1.356 0 0 0 1.159 2.034h11.484a1.355 1.355 0 0 0 1.16-2.033L9.66 2.543a1.356 1.356 0 0 0-2.32 0v0ZM8.5 11.333h.007" />
    </g>
    <defs>
      <clipPath id="a">
        <path d="M0 0h17v17H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
export default ErrorIcon;
