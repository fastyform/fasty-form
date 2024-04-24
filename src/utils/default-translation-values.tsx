import { ReactNode } from 'react';
import Constants from './constants';

const defaultTranslationValues = {
  NewLine: () => <br />,
  Yellow: (chunks: ReactNode) => <span className="text-yellow-400">{chunks}</span>,
  Strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
  AppName: () => Constants.APP_NAME,
};

export default defaultTranslationValues;
