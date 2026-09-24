import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { services } from "../constants/constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";

const ServiceCard = ({ index, title, icon, description, skills }) => {
  const cardRef = useRef(null);
  // Progress of the whole card, drives the border shine in the opposite
  // direction of the scroll so the ring highlight sweeps like light moving
  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  // Ring highlight rotates backwards (opposite the scroll) as a shine passes
  const ringAngle = useTransform(cardProgress, [0, 1], ["150deg", "-150deg"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.08 * index }}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 26 } }}
      className="group relative z-10 h-[480px] w-[calc(100%-2rem)] sm:w-[320px] m-4 rounded-2xl shadow-[0_35px_80px_-15px_rgba(0,0,0,0.85),0_15px_50px_-10px_rgba(0,20,10,0.7)]"
      style={{ "--ring-angle": ringAngle }}
    >
      <div className="card-wrapper relative h-full w-full shadow-lg overflow-hidden">
        <div className="card-content w-full h-full flex flex-col justify-center items-center relative overflow-hidden">
          <div className="w-full h-full px-6 pt-6 pb-8 flex flex-col gap-5 justify-center items-center text-center">
            <h3 className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-white via-[#b6ffbe] to-[#22c55e] text-[18px] sm:text-[20px] font-bold px-5 text-center leading-snug">
              {title}
            </h3>

            {description && (
              <p className="relative z-10 text-[14px] sm:text-[15px] leading-relaxed font-medium text-white/60 group-hover:text-white transition-colors duration-500">
                {description}
              </p>
            )}
            {skills && skills.length > 0 && (
              <div className="grid grid-cols-2 gap-2 w-full relative z-10 overflow-hidden">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="group/chip inline-flex w-full items-center justify-center gap-2 border border-white/10 bg-transparent rounded-full px-2 py-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-white/60 group-hover:border-[#22c55e]/45 group-hover:text-white transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
                {/* One soft green light sweeping across the whole grid on card
                    hover, in the logo's greens. A vertical mask fades the bar
                    out at its top and bottom, so the skewed rectangle never
                    shows a hard edge or a clipped corner. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(100deg,transparent,rgba(167,243,208,0.35),rgba(74,222,128,0.18),transparent)] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] group-hover:[animation:chip-sweep_1.2s_ease-out]"
                  style={{ transform: "translateX(-120%) skewX(-18deg)" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// About component with additional top spacing for cards.
function About() {
  return (
    <div className="flex flex-col gap-10">
      <motion.div variants={textVariant()} className="mt-6">
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>
      <motion.div className="mb-20">
        <p
          variants={textVariant()}
          className="text-secondary text-[15px] leading-[24px] max-w-6xl sm:text-[20px] sm:leading-[30px]"
        >
          I'm a software engineer who builds interfaces people actually use, and I
          stay close to the customer while building them. My core craft is React
          and TypeScript: component architecture, clean UI, API integration. I
          don't stop at the frontend boundary. I've been the sole technical owner
          in enterprise client environments, including Fortune 500
          pharmaceutical accounts, where I debug live production issues and ship
          the fixes myself.
          <br />
          <br />
          I build AI into what I ship, not just around it. I led the technical
          rollout of generative AI features on Azure OpenAI, including a RAG
          knowledge retrieval system that cut search time by 50% and resolution
          time by 25%.
          <br />
          <br />
          Outside work, I prototype with Claude Code, Codex and local LLMs. My
          builds there include a React-based 3D model inspector, a voice-driven
          analytics dashboard, and Enterprise Knowledge &amp; Support Copilot: an
          enterprise RAG assistant that answers from company documents, cites its
          sources, and keeps answering through cloud outages by falling back to
          local models.
          <br />
          <br />
          I'm driven by closing the gap between what engineering builds and what
          the customer actually experiences. Let's connect.
        </p>
      </motion.div>

      <div className="relative flex justify-evenly flex-wrap">
        {/* Aurora light shimmering behind all cards, spreading and fading into
            the dark around the edges */}
        <div
          aria-hidden="true"
          className="about-aurora absolute -inset-x-[25rem] -inset-y-24 pointer-events-none max-sm:-inset-x-6 max-sm:-inset-y-8"
          style={{ mixBlendMode: "screen" }}
        >
          {/* Layer 1: emerald pool over the left/top card */}
          <motion.div
            animate={{ x: [-110, 120, -110], opacity: [0.4, 0.68, 0.4] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[-4%] top-[8%] h-[80%] w-[48%] rounded-full max-sm:left-0 max-sm:right-0 max-sm:top-0 max-sm:w-auto max-sm:h-[50%]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(52,211,153,0.55) 0%, rgba(34,197,94,0.22) 45%, transparent 74%)",
              filter: "blur(50px)",
            }}
          />
          {/* Layer 2: teal pool over the right/middle card */}
          <motion.div
            animate={{ x: [120, -130, 120], opacity: [0.4, 0.66, 0.4] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute right-[-4%] top-[14%] h-[72%] w-[46%] rounded-full max-sm:left-[10%] max-sm:right-[-10%] max-sm:top-[36%] max-sm:w-auto max-sm:h-[46%]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(45,212,191,0.5) 0%, rgba(45,212,191,0.2) 45%, transparent 74%)",
              filter: "blur(58px)",
            }}
          />
          {/* Layer 3: blue/purple pool across the center/bottom card */}
          <motion.div
            animate={{ x: [-70, 90, -70], y: [12, -16, 12], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute left-[26%] bottom-[2%] h-[72%] w-[48%] rounded-full max-sm:left-[-8%] max-sm:right-[-8%] max-sm:bottom-0 max-sm:w-auto max-sm:h-[52%]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(129,140,248,0.5) 0%, rgba(96,165,250,0.18) 48%, transparent 76%)",
              filter: "blur(62px)",
            }}
          />
        </div>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  );
}

export default SectionWrapper(About, "about");
