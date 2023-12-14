'use client';

import { ChangeEvent } from 'react';
import { FormControlLabel, Switch, SwitchProps } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { twMerge } from 'tailwind-merge';
import { actionSetCookiesConsent } from '@/app/(legal-contact)/cookies/_actions/action-set-cookies-consent';
import { CookieConsent } from '@/app/(legal-contact)/cookies/_utils/types';

interface Props extends SwitchProps {
  label: string;
}

const ConsentSwitch = ({ label, disabled, ...props }: Props) => (
  <div className="flex w-64 items-center justify-between">
    <span>Wył.</span>
    <FormControlLabel
      label={label}
      labelPlacement="top"
      classes={{
        label: twMerge(disabled && 'text-white '),
        root: twMerge(disabled && 'grayscale pointer-events-none opacity-75'),
      }}
      control={
        <Switch
          disabled={disabled}
          {...props}
          className="[&_.MuiSwitch-switchBase.Mui-checked]:text-yellow-400 [&_.MuiSwitch-switchBase.Mui-checked]:hover:bg-yellow-400/20 [&_.MuiSwitch-switchBase.Mui-checked_+_.MuiSwitch-track]:bg-yellow-400 [&_.MuiSwitch-switchBase_+_.MuiSwitch-track]:bg-white"
        />
      }
    />
    <span>Wł.</span>
  </div>
);

const ConsentSwitches = ({ cookiesConsent }: { cookiesConsent?: RequestCookie }) => {
  if (!cookiesConsent) return;
  const cookiesConsentValues = JSON.parse(cookiesConsent.value) as CookieConsent;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    actionSetCookiesConsent({ ...cookiesConsentValues, [event.target.name]: event.target.checked });
  };

  return (
    <FormControl component="fieldset">
      <FormGroup>
        <ConsentSwitch checked disabled label="Niezbędne cookies" />
        <ConsentSwitch
          checked={cookiesConsentValues.googleAnalytics}
          label="Google Analytics"
          name="googleAnalytics"
          onChange={handleChange}
        />
        <ConsentSwitch checked={cookiesConsentValues.hotjar} label="Hotjar" name="hotjar" onChange={handleChange} />
      </FormGroup>
    </FormControl>
  );
};

export default ConsentSwitches;
