import { RefObject, SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  circleRef?: RefObject<SVGSVGElement>;
}

const CircleIcon = ({ circleRef, ...props }: Props) => (
  <svg ref={circleRef} fill="none" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="125" cy="125" r="120" strokeWidth="10" />
  </svg>
);

export default CircleIcon;
