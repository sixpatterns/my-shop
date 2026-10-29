import ProgressBar from "@badrap/bar-of-progress";
import { FC, lazy, Suspense, useEffect } from "react";

const LoadingBar = () => {
  useEffect(() => {
    const progress = new ProgressBar();
    progress.start();

    return () => {
      progress.finish();
    };
  }, []);

  return null;
};

const AsyncComponent = (importFn: () => Promise<{ default: FC }>) => {
  const LazyComponent = lazy(importFn);

  const component = () => (
    <Suspense fallback={<LoadingBar />}>
      <LazyComponent />
    </Suspense>
  );

  return component;
};

export default AsyncComponent;
