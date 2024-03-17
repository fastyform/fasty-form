import { ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const AppReactPortalWrapper = ({
  children,
  wrapperId = 'portal-root',
}: {
  children: ReactNode;
  wrapperId?: string;
}) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const element = document.getElementById(wrapperId);

    setWrapperElement(element);
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};

export default AppReactPortalWrapper;
