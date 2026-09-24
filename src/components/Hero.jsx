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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
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
            Hi, I'm <span className="text-[#087e00]">Akın</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I build production UI in React and TypeScript,
            <br className="sm:block hidden" />
            and I own it end-to-end, <br className="sm:block hidden" /> from
            architecture to the customer's environment.{" "}
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
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
