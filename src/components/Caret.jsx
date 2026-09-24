import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CaretIcon from "/caretsvg.svg";

const Caret = () => {
  const btnRef = useRef(null);
  // ring sweeps opposite to scroll, matching the section cards
  const { scrollYProgress } = useScroll({
    target: btnRef,
    offset: ["start end", "end start"],
  });
  const ringAngle = useTransform(scrollYProgress, [0, 1], ["150deg", "-150deg"]);

  return (
    <motion.div
      ref={btnRef}
      id="scrollToTop"
      className="md:block group absolute bottom-16 right-16 cursor-pointer"
      style={{
        "--ring-angle": ringAngle,
        zIndex: 20
      }}
    >
<div className="caret-ring rounded-full">
          <a
            href="#top"
            aria-label="Scroll to top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="block"
          >
            <div className="caret-body h-[46px] w-[46px] flex items-center justify-center">
              <img
                src={CaretIcon}
                width="22"
                height="22"
                className="hover:-translate-y-1.5 ease-out duration-500 opacity-60 group-hover:opacity-90 transition-all"
                alt="Scroll to top"
              />
            </div>
          </a>
        </div>
    </motion.div>
  );
};

export default Caret;