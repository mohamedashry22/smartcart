import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { defaultLqip, fallbackImage } from "../api/foodImagePool";
import type { ImgHTMLAttributes } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  lqip?: string;
}

export const SmartLazyImage = ({ src, alt, lqip = defaultLqip, className, ...rest }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(lqip || defaultLqip);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsInView(true);
        });
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || !src) return;
    const controller = new AbortController();
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (!controller.signal.aborted) {
        setImageSrc(src);
        setLoaded(true);
      }
    };
    img.onerror = () => {
      if (!controller.signal.aborted) {
        setImageSrc(fallbackImage);
      }
    };
    return () => controller.abort();
  }, [isInView, src]);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <img
        src={imageSrc}
        alt={alt}
        className={classNames(
          "w-full h-full object-cover transition duration-700",
          loaded ? "blur-0 scale-100" : "blur-sm scale-[1.02]",
          className
        )}
        onError={() => setImageSrc(fallbackImage)}
        {...rest}
      />
    </div>
  );
};
