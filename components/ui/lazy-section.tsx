"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  minHeight?: string;
}

/**
 * LazySection — mounts children only when they are ~300px away from the viewport.
 * Once mounted the section stays rendered (never unmounts).
 * `minHeight` keeps a placeholder so the scrollbar height stays natural.
 */
export function LazySection({ children, minHeight = "60vh" }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {shouldRender ? children : <div style={{ minHeight }} />}
    </div>
  );
}
