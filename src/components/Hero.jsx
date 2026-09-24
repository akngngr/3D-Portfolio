import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";

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
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#087e00]" />
          <div className="w-1 sm:h-80 h-40 green-gradient" />
        </div>

        <div className="z-10">
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
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            The customer's environment is my production environment,{" "}
            <br className="sm:block hidden" />
            frontend to full-stack to fixes that stick.{" "}
          </p>
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
          className="relative flex flex-col items-center gap-3 group"
        >
          {/* Breathing glow */}
          <motion.span
            aria-hidden="true"
            animate={{ opacity: [0.2, 0.55, 0.2], scale: [0.95, 1.06, 0.95] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-[#22c55e]/30 blur-xl"
          />

          {/* Mouse track */}
          <div className="relative w-[30px] h-[50px] rounded-full border-2 border-[#22c55e]/70 p-[7px]">
<motion.div
              animate={{ y: [0, 22, 22, 0], opacity: [1, 0.15, 0.15, 1] }}
              transition={{
                duration: 6,
                times: [0, 0.35, 0.75, 1],
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              className="w-full h-[10px] rounded-full bg-gradient-to-b from-[#22c55e] to-[#087e00]"
            />
          </div>

          {/* Label */}
          <motion.span
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="text-[11px] tracking-[0.35em] uppercase text-secondary select-none"
          >
            scroll
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
