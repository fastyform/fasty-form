import { useEffect, useRef } from 'react';
import CircleIcon from '@/app/(content)/submissions/[id]/requirements/_assets/circle-icon';
import AppReactPortalWrapper from '@/components/app-react-portal-wrapper';

const ProgressCircular = ({ progress }: { progress: number }) => {
  const progressCircleRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!progressCircleRef.current) return;
    const radius = Number(progressCircleRef.current.querySelector('circle')?.getAttribute('r'));
    if (typeof radius !== 'number') return;
    const dasharrayValue = Math.PI * (radius * 2);
    const offsetValue = dasharrayValue * ((100 - progress) / 100);
    progressCircleRef.current.setAttribute(
      'style',
      `stroke-dasharray: ${dasharrayValue};stroke-dashoffset:${offsetValue};display:block;`,
    );
  }, [progress, progressCircleRef]);

  return (
    <AppReactPortalWrapper>
      <div className="min-h-screen-responsive fixed left-0 top-0 z-50 flex w-screen items-center justify-center bg-shark/90 p-10 backdrop-blur">
        <div className="flex w-full max-w-sm flex-col gap-10">
          <div className="relative">
            <CircleIcon className="w-full stroke-white/10" />
            <CircleIcon
              circleRef={progressCircleRef}
              className="absolute left-1/2 top-1/2 z-10 hidden w-full -translate-x-1/2 -translate-y-1/2 animate-[1s_linear_infinite] stroke-yellow-400 transition-all"
            />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-4xl font-bold text-white min-[400px]:text-6xl sm:text-[90px]">
              {Math.round(progress)} %
            </span>
          </div>
          <p className="text-center font-bold text-white">
            Trwa wysyłanie wideo. Pozostaw to okno otwarte do momentu zakończenia. Zamknięcie okna spowoduje przerwanie.
          </p>
        </div>
      </div>
    </AppReactPortalWrapper>
  );
};

export default ProgressCircular;
