import { useEffect } from "react";
import Lenis from "lenis";
import type { PropsWithChildren } from "react";

export const MotionProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
