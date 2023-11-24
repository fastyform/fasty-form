'use client';

import { Slider, SliderProps } from '@mui/material';

const FileUploadSlider = (props: SliderProps) => (
  <Slider
    classes={{
      root: 'text-yellow-400',
      active: 'shadow-none after:bg-yellow-400/30 before:bg-yellow-400/30',
    }}
    {...props}
  />
);

export default FileUploadSlider;
