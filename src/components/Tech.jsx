import { lazy, Suspense } from "react";

import { SectionWrapper } from "../hoc";

const TechCanvas = lazy(() => import("./canvas/TechCanvas"));

const Tech = () => {
  return (
    <div className="w-full h-[640px] md:h-[560px]">
      <Suspense fallback={null}>
        <TechCanvas />
      </Suspense>
    </div>
  );
};

export default SectionWrapper(Tech, "")