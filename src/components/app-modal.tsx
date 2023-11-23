'use client';

import { MouseEventHandler, ReactNode, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const AppModal = ({ children, shouldClose }: { children: ReactNode; shouldClose?: boolean }) => {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
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

  useEffect(() => {
    if (!shouldClose) return;

    onDismiss();
  }, [shouldClose, onDismiss]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div ref={overlay} className="fixed bottom-0 left-0 right-0 top-0 z-30 mx-auto bg-black/75" onClick={onClick}>
      <div ref={wrapper} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
};

export default AppModal;
