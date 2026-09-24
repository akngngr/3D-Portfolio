import React from "react";
import { motion } from "framer-motion";

// Layered mountain range, like zen fog-landscape wallpaper. Each range is
// backed by a soft light that breathes out of phase, so the glow washes
// across the peaks one after another (back -> mid -> front).
const AnimatedLogo = ({ className }) => (
  <svg
    viewBox="0 0 120 120"
    className={className}
    aria-label="Akin Gungor"
    role="img"
  >
    <defs>
      <radialGradient id="lgGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#a7f3d0" stopOpacity="0.9" />
        <stop offset="0.55" stopColor="#4ade80" stopOpacity="0.35" />
        <stop offset="1" stopColor="#4ade80" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="lgBack" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2b7d4c" />
        <stop offset="1" stopColor="#0e5d2f" />
      </linearGradient>
      <linearGradient id="lgMid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#22c55e" />
        <stop offset="1" stopColor="#15803d" />
      </linearGradient>
      <linearGradient id="lgFront" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#15803d" />
        <stop offset="1" stopColor="#052e16" />
      </linearGradient>
    </defs>

    {/* Soft glows, breathing one after another */}
    <motion.ellipse
      cx="60"
      cy="32"
      rx="54"
      ry="28"
      fill="url(#lgGlow)"
      initial={{ opacity: 0.15 }}
      animate={{ opacity: [0.12, 0.5, 0.12], scale: [0.95, 1.06, 0.95] }}
      transition={{
        duration: 4.5,
        times: [0, 0.5, 1],
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.ellipse
      cx="60"
      cy="66"
      rx="56"
      ry="20"
      fill="url(#lgGlow)"
      initial={{ opacity: 0.15 }}
      animate={{ opacity: [0.12, 0.5, 0.12], scale: [0.95, 1.06, 0.95] }}
      transition={{
        duration: 4.5,
        times: [0, 0.5, 1],
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.5,
      }}
    />
    <motion.ellipse
      cx="60"
      cy="112"
      rx="58"
      ry="14"
      fill="url(#lgGlow)"
      initial={{ opacity: 0.15 }}
      animate={{ opacity: [0.12, 0.5, 0.12], scale: [0.95, 1.06, 0.95] }}
      transition={{
        duration: 4.5,
        times: [0, 0.5, 1],
        repeat: Infinity,
        ease: "easeInOut",
        delay: 3,
      }}
    />

    {/* Far range: one large peak behind. Opaque so the hover aurora
        behind the logo can never tint the mountains. */}
    <path d="M16 96 L60 26 L104 96 L120 120 L0 120 Z" fill="url(#lgBack)" />
    {/* Mid range: two smaller peaks in front */}
    <path
      d="M4 106 L40 56 L62 94 L84 56 L116 106 L120 120 L0 120 Z"
      fill="url(#lgMid)"
    />
    {/* Foreground: soft dark foothill */}
    <path
      d="M0 120 L0 114 Q28 102 54 112 Q80 122 120 110 L120 120 Z"
      fill="url(#lgFront)"
    />
  </svg>
);

export default AnimatedLogo;