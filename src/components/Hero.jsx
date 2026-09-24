import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import TerminalText from "./TerminalText";

const ComputersCanvas = lazy(() => import("./canvas/Computers"));

const Hero = () => {
  const sectionRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let cancelled = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Defer the heavy 3D render until the browser has a quiet moment, so
          // the hero text (LCP) paints first without competing for the thread.
          const rIC =
            window.requestIdleCallback ||
            ((cb) => setTimeout(() => cb({ didTimeout: false }), 300));
          rIC(() => {
            if (cancelled) return;
            setIsReady(true);
            observer.disconnect();
          });
        }
      },
      { rootMargin: "200px 0px", threshold: 0 }
    );
    observer.observe(section);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen mx-auto">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[150px] md:top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          {/* node with a soft breathing halo */}
          <div className="relative w-4 h-4 flex items-center justify-center">
            <motion.span
              aria-hidden="true"
              animate={{ opacity: [0.12, 0.4, 0.12], scale: [0.9, 1.2, 0.9] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-[#4ade80] blur-md"
            />
            <div className="relative w-2 h-2 rounded-full bg-[#4ade80]" />
          </div>
          {/* hairline beam, drawn in on load */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: "easeOut" }}
            className="relative w-px sm:h-44 h-32 origin-top bg-[linear-gradient(180deg,#4ade80_0%,rgba(74,222,128,0.25)_55%,rgba(74,222,128,0)_100%)]"
          />
        </div>

        <div className="z-10 w-full min-w-0">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm{" "}
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              className="bg-[linear-gradient(90deg,#087e00,#4ade80,#087e00)] bg-[length:200%_auto] bg-clip-text text-transparent"
            >
              Akın
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="mt-3 text-secondary text-[12px] sm:text-[13px] uppercase tracking-[0.2em]"
          >
            Software Engineer · Frontend, Forward-Deployed &amp; Support
          </motion.p>
          <TerminalText
            text="From component to customer's environment, I own everything in between."
            className={`${styles.heroSubText} lg:text-[24px] sm:text-[21px] text-[15px] md:max-w-[75%]`}
          />
        </div>
      </div>

      {isReady && (
        <Suspense fallback={null}>
          <ComputersCanvas />
        </Suspense>
      )}

      {/* Scrolling helper button */}
      <div className="absolute xs:bottom-25 bottom-8 w-full flex justify-center items-center">
        <motion.a
          href="#about"
          aria-label="Scroll down to the About section"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="relative flex flex-col items-center gap-2.5 group"
        >
          {/* Breathing halo */}
          <motion.span
            aria-hidden="true"
            animate={{ opacity: [0.12, 0.4, 0.12], scale: [0.92, 1.12, 0.92] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-[#22c55e]/30 blur-xl"
          />

          {/* Minimal disc with a breathing down-chevron */}
          <div className="relative w-12 h-12 rounded-full border border-[#22c55e]/40 bg-white/[0.02] flex items-center justify-center">
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              animate={{ y: [0, 3, 0], opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-5 text-[#4ade80]"
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </div>

          {/* Label */}
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-[10px] tracking-[0.4em] uppercase text-secondary select-none"
          >
            scroll
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
