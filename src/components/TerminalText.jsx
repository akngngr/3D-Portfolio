import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Types a line like a shell prompt, then leaves a blinking block cursor.
const TerminalText = ({ text, prompt, className = "" }) => {
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(text.length);
      return;
    }

    let index = 0;
    let intervalId;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        setTyped(index);
        if (index >= text.length) clearInterval(intervalId);
      }, 30);
    }, 700);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text]);

  return (
    <p className={`${className} mt-2 font-mono leading-[1.5]`}>
      {/* Full copy stays in the DOM for screen readers and crawlers */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {prompt && <span className="text-[#4ade80]">{prompt} </span>}
        {text.slice(0, typed)}
        <motion.span
          className="inline-block w-[0.55em] h-[1em] ml-[0.15em] align-middle bg-[#4ade80]"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            duration: 1.1,
            times: [0, 0.5, 0.5, 1],
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </span>
    </p>
  );
};

export default TerminalText;