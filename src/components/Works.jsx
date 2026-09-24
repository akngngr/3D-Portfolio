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
      aria-label={`${name}, show details`}
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
      // Single rounded-2xl element; border lives on this same box, so there's
      // no nested rounded-rect mismatch and no corner artifact.
      className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer outline-none
                 border border-white/10 hover:border-[#5B8DEF]/60
                 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_40px_-12px_rgba(91,141,239,0.35)]
                 transition-[border-color,box-shadow] duration-300
                 focus-visible:ring-2 focus-visible:ring-[#5B8DEF] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
    >
      {/* Headline image, fixed crop; never re-crops between states */}
      <div className="relative aspect-[16/9] lg:aspect-[16/8] overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover object-top transition-[transform,filter] duration-500 ease-out ${
            active ? "blur-[2px]" : "blur-0"
          }`}
          style={{ transform: active ? "scale(1.05)" : "scale(1)" }}
        />

        {/* Faint top scrim only, so action icons stay legible without darkening the whole showcase */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

        {/* Action buttons: always visible and tappable */}
        <div className="absolute top-0 right-0 flex gap-2 m-3 z-10">
          {live_link && (
            <div className="relative flex items-center justify-center">
              <motion.span
                aria-hidden="true"
                animate={
                  active ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0.94 }
                }
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -inset-1 rounded-full bg-white/30 blur-md pointer-events-none"
              />
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(live_link, "_blank", "noopener");
                }}
                aria-label={`Open live project: ${name}`}
                className="relative w-9 h-9 rounded-full border border-white/10 bg-black/80 backdrop-blur-sm flex justify-center items-center text-white hover:border-[#4ade80]/70 hover:bg-black/90 transition-colors duration-300 ease-out"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ExternalLinkIcon />
              </motion.button>
            </div>
          )}
          {source_code_link && (
            <div className="relative flex items-center justify-center">
              <motion.span
                aria-hidden="true"
                animate={
                  active ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0.94 }
                }
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -inset-1 rounded-full bg-white/30 blur-md pointer-events-none"
              />
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(source_code_link, "_blank", "noopener");
                }}
                aria-label={`View source code: ${name}`}
                className="relative w-9 h-9 rounded-full border border-white/10 bg-black/80 backdrop-blur-sm flex justify-center items-center hover:border-[#4ade80]/70 hover:bg-black/90 transition-colors duration-300 ease-out"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src={github} alt="" className="w-1/2 h-1/2 object-contain" />
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Slim title bar with a reserved second line, so every card is exactly
          the same height whatever the title length. */}
      <div className="bg-[#0b0f17] border-t border-white/10 px-5 pt-3 pb-4 flex items-center justify-between gap-3">
        <h3 className="text-white font-bold text-[16px] sm:text-[18px] leading-snug line-clamp-2 min-h-[2.75em]">
          {name}
        </h3>
        <span className="w-6 h-6 rounded-full border border-white/25 flex items-center justify-center text-white/70 shrink-0">
          <PlusIcon active={active} />
        </span>
      </div>

      {/* Detail panel overlays the card instead of expanding it, so hovering
          never changes a card's height or moves any other card. */}
      <motion.div
        initial={false}
        animate={{ y: active ? "0%" : "100%", opacity: active ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`absolute inset-x-0 bottom-0 z-20 max-h-full overflow-y-auto bg-[#0b0f17]/95 backdrop-blur-sm border-t border-white/10 px-5 pt-3 pb-4 flex flex-col ${
          active ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Title stays carried at the top of the panel, above the description */}
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-white font-bold text-[16px] sm:text-[18px] leading-snug line-clamp-2">
            {name}
          </h3>
          <span className="w-6 h-6 rounded-full border border-white/25 flex items-center justify-center text-white/70 shrink-0">
            <PlusIcon active={active} />
          </span>
        </div>
        <p className="pt-3 text-secondary text-[13px] leading-[19px] sm:text-[15px] sm:leading-[22px]">
          {description}
        </p>
        <div className="pt-3 flex flex-wrap gap-x-3 gap-y-1.5">
          {tags.map((tag) => (
            <span
              key={`${name}-${tag.name}`}
              className={`text-[12px] sm:text-[13px] ${tag.color}`}
            >
              #{tag.name}
            </span>
          ))}
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
        >
          Selected work, from AI-powered dashboards to a 3D model inspector,
          each one shipped end-to-end and live behind the links. More of my
          side experiments live on GitHub.
        </motion.p>
      </div>

      {/* Fixed-height cards: the title bar always reserves two lines, so every
          card is the same size. The detail panel overlays the lower part of
          the card on hover, so no card grows and nothing on screen moves. */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
