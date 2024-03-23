import { SVGProps } from 'react';

const Diamond = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 77 68" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      clipRule="evenodd"
      d="M.722 22.667 38.5 68l37.778-45.333L64.944 0H12.057L.722 22.667Zm46.75-3.778h-36.36l5.666-11.333h43.444l5.667 11.333H47.472Zm-33.716 7.555H63.245L42.278 51.661h-7.556L13.756 26.444Z"
      fill="#FACC15"
      fillRule="evenodd"
    />
    <path
      d="m30.128 18.886 5.667-11.333h-8.406l-5.667 11.333h8.406ZM47.474 18.887 41.808 7.554h8.405l5.667 11.333h-8.406ZM34.722 26.444v25.217h7.556V26.444h-7.556Z"
      fill="#FEF9C3"
    />
  </svg>
);
export default Diamond;
