'use client';

import { MouseEventHandler, ReactNode, useCallback, useEffect, useRef } from 'react';
import { Route } from 'next';
import { useRouter } from 'next/navigation';
import AppReactPortalWrapper from './app-react-portal-wrapper';

const AppModal = ({ children, redirectUrl }: { children: ReactNode; redirectUrl: Route }) => {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.push(redirectUrl);
  }, [router, redirectUrl]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      const { target } = e;
      if ((target === overlay.current || target === wrapper.current) && onDismiss) {
        onDismiss();
      }
    },
    [onDismiss, overlay, wrapper],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <AppReactPortalWrapper>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div ref={overlay} className="fixed bottom-0 left-0 right-0 top-0 z-50 mx-auto bg-black/75 " onClick={onClick}>
        <div
          ref={wrapper}
          className="absolute left-1/2 top-1/2 max-h-screen -translate-x-1/2 -translate-y-1/2 overflow-auto scroll-auto"
        >
          {children}
        </div>
      </div>
    </AppReactPortalWrapper>
  );
};

export default AppModal;
