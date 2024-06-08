'use client';

import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import AppDialog from './app-dialog';
import AppInput from './app-input/app-input';

const AppDatePicker = (props: DatePickerProps<Dayjs>) => (
  <DatePicker
    {...props}
    slots={{ textField: AppInput, dialog: AppDialog }}
    slotProps={{
      desktopPaper: { className: 'bg-shark bg-none rounded-xl border-gray-600 border' },
      mobilePaper: { className: 'bg-none' },
      textField: props?.slotProps?.textField,
    }}
  />
);

export default AppDatePicker;
