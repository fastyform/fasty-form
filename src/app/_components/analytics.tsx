'use client';

import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

const development = process.env.NODE_ENV !== 'production';
const tagManagerArgs = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID!,
};

const Analytics = () => {
  useEffect(() => {
    if (!development) {
      TagManager.initialize(tagManagerArgs);
    }
  }, []);

  return null;
};

export default Analytics;
