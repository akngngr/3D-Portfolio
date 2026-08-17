import React, { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants/constants";
import { fadeIn, textVariant } from "../utils/motion";

const ExternalLinkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-1/2 h-1/2"
  >
    <path
      d="M7 17L17 7M17 7H8M17 7V16"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = ({ active }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
      active ? "rotate-45" : ""
    }`}
  >
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);

// Collapsed = a slim title bar only, so the image does almost all the work at rest.
const COLLAPSED_HEIGHT = 56;
const EXPANDED_HEIGHT = 224;

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_link,
}) => {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.12 * index, 0.6)}
      role="button"
      tabIndex={0}
      aria-expanded={active}
      aria-label={`${name} — show details`}
      onClick={() => setActive((v) => !v)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setActive((v) => !v);
        }
      }}
      // Single rounded-2xl element — border lives on this same box, so there's
      // no nested rounded-rect mismatch and no corner artifact.
      className="relative w-full aspect-[4/3] sm:aspect-[16/12] rounded-2xl overflow-hidden cursor-pointer outline-none
                 border border-white/10 hover:border-[#5B8DEF]/60
                 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_40px_-12px_rgba(91,141,239,0.35)]
                 transition-[border-color,box-shadow] duration-300
                 focus-visible:ring-2 focus-visible:ring-[#5B8DEF] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
    >
      {/* Full-bleed image — fixed crop, never resizes or re-crops between states */}
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out"
        style={{ transform: active ? "scale(1.05)" : "scale(1)" }}
      />

      {/* Faint top scrim only, so action icons stay legible without darkening the whole showcase */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

      {/* Action buttons — always visible and tappable */}
      <div className="absolute top-0 right-0 flex gap-2 m-3 z-10">
        {live_link && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              window.open(live_link, "_blank", "noopener");
            }}
            aria-label={`Open live project: ${name}`}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex justify-center items-center text-white hover:scale-110 hover:bg-black/80 transition-all duration-200"
          >
            <ExternalLinkIcon />
          </button>
        )}
        {source_code_link && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              window.open(source_code_link, "_blank", "noopener");
            }}
            aria-label={`View source code: ${name}`}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex justify-center items-center hover:scale-110 hover:bg-black/80 transition-all duration-200"
          >
            <img src={github} alt="" className="w-1/2 h-1/2 object-contain" />
          </button>
        )}
      </div>

      {/* Bottom panel — fully opaque solid color, so legibility never depends on
          the image's brightness (fixes the "blur disappears on dark images" issue) */}
      <motion.div
        animate={{ height: active ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="absolute bottom-0 left-0 right-0 bg-[#0b0f17] border-t border-white/10 px-5 pt-3 pb-4 flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between gap-3 shrink-0">
          <h3 className="text-white font-bold text-[19px] sm:text-[20px] leading-tight truncate">
            {name}
          </h3>
          <span className="w-6 h-6 rounded-full border border-white/25 flex items-center justify-center text-white/70 shrink-0">
            <PlusIcon active={active} />
          </span>
        </div>

        <div
          className={`transition-opacity duration-300 ${
            active ? "opacity-100 delay-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <p className="mt-2.5 text-secondary text-[16px] leading-[22px] line-clamp-6">
            {description}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
            {tags.map((tag) => (
              <span
                key={`${name}-${tag.name}`}
                className={`text-[13px] ${tag.color}`}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        ></motion.p>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
