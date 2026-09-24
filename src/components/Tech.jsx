import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";

const TechCanvas = lazy(() => import("./canvas/TechCanvas"));

const Aurora = () => (
  <div
    aria-hidden="true"
    className="absolute -inset-x-32 -inset-y-16 pointer-events-none"
    style={{
      mixBlendMode: "screen",
      maskImage:
        "radial-gradient(95% 62% at 50% 48%, #000 52%, transparent 94%)",
      WebkitMaskImage:
        "radial-gradient(95% 62% at 50% 48%, #000 52%, transparent 94%)",
    }}
  >
    {/* emerald band */}
    <motion.div
      animate={{ x: [-90, 110, -90], opacity: [0.4, 0.68, 0.4] }}
      transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-[-4%] top-[8%] h-[80%] w-[62%] rounded-full"
      style={{
        background:
          "radial-gradient(closest-side, rgba(52,211,153,0.55) 0%, rgba(34,197,94,0.22) 45%, transparent 74%)",
        filter: "blur(50px)",
      }}
    />
    {/* teal band */}
    <motion.div
      animate={{ x: [100, -120, 100], opacity: [0.4, 0.66, 0.4] }}
      transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute right-[0%] top-[14%] h-[72%] w-[55%] rounded-full"
      style={{
        background:
          "radial-gradient(closest-side, rgba(45,212,191,0.5) 0%, rgba(45,212,191,0.2) 45%, transparent 74%)",
        filter: "blur(58px)",
      }}
    />
    {/* blue/purple whisper */}
    <motion.div
      animate={{ x: [-50, 80, -50], y: [12, -16, 12], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute left-[22%] bottom-[2%] h-[70%] w-[62%] rounded-full"
      style={{
        background:
          "radial-gradient(closest-side, rgba(129,140,248,0.5) 0%, rgba(96,165,250,0.18) 48%, transparent 76%)",
        filter: "blur(62px)",
      }}
    />
  </div>
);

const Tech = () => {
  return (
    <div className="relative w-full h-[640px] md:h-[560px]">
      <Aurora />
      <div className="relative z-10 h-full w-full">
        <Suspense fallback={null}>
          <TechCanvas />
        </Suspense>
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "")