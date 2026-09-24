import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CaretIcon from "/caretsvg.svg";

const Caret = () => {
  // Show once the user has scrolled past the hero and stay visible all the way
  // down, including at the contact form. (Hidden on mobile so it never floats
  // over the contact form's send button.)
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 500);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.7, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="hidden md:flex fixed bottom-6 right-6 z-20 items-center justify-center w-[44px] h-[44px] rounded-full border border-white/10 bg-[#05070d]/70 backdrop-blur-md shadow-[0_10px_30px_-12px_rgba(0,0,0,0.75)] hover:border-[#22c55e]/50 transition-colors duration-300"
        >
          {/* Soft breathing halo */}
          <motion.span
            aria-hidden="true"
            animate={{ opacity: [0.12, 0.35, 0.12], scale: [1, 1.3, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-3 rounded-full bg-[#22c55e]/30 blur-lg"
          />
          {/* Caret floats up gently, breathing in and out */}
          <motion.img
            src={CaretIcon}
            width="20"
            height="20"
            alt=""
            animate={{ y: [0, -3, 0], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          />
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default Caret;