'use client';

import { useEffect } from 'react';
import Hotjar from '@hotjar/browser';

const siteId = Number(process.env.HOTJAR_SITE_ID!);
const hotjarVersion = 6;
const development = process.env.NODE_ENV !== 'production';

const Analytics = () => {
  useEffect(() => {
    if (!development) {
      Hotjar.init(siteId, hotjarVersion);
    }
  }, []);

  return null;
};

export default Analytics;
