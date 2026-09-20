import { lazy, Suspense, useEffect, useState } from "react";

const SpiritualScene = lazy(() => import("@/components/spiritual-scene"));

export function AtmosphericBackdrop() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="atmospheric-scene" aria-hidden="true">
      {mounted ? (
        <Suspense fallback={null}>
          <SpiritualScene />
        </Suspense>
      ) : null}
    </div>
  );
}