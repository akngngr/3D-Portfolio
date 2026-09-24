import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { services } from "../constants/constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";

const ServiceCard = ({ index, title, icon, description, skills }) => {
  const textRef = useRef(null);
  const cardRef = useRef(null);
  // Progress of the description block through the viewport (0 = entering, 1 = leaving)
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start end", "end start"],
  });
  // Progress of the whole card, drives the border shine in the opposite
  // direction of the scroll so the ring highlight sweeps like light moving
  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  // Ring highlight rotates backwards (opposite the scroll) as a shine passes
  const ringAngle = useTransform(cardProgress, [0, 1], ["150deg", "-150deg"]);
  // A subtle white reading glow that sweeps down through the description
  // as it scrolls, mirroring the hero name treatment but vertical
  const bgY = useTransform(scrollYProgress, [0, 1], ["-60%", "40%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.85, 1, 1, 0.85]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.08 * index }}
      whileHover={{ scale: 1.03, y: -6 }}
      className="group relative z-10 h-[500px] w-[350px] m-4 rounded-2xl shadow-[0_35px_80px_-15px_rgba(0,0,0,0.85),0_15px_50px_-10px_rgba(0,20,10,0.7)]"
      style={{ "--ring-angle": ringAngle }}
    >
      <div className="card-wrapper relative h-full w-full shadow-lg overflow-hidden">
        <div className="card-content w-full h-full flex flex-col justify-center items-center relative overflow-hidden">
          <div className="w-full p-6 flex flex-col gap-5 justify-center items-center text-center">
            <h3 className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-white via-[#b6ffbe] to-[#22c55e] text-[22px] font-bold px-5 text-center leading-snug">
              {title}
            </h3>

            {description && (
              <motion.p
                ref={textRef}
                className="relative z-10 text-transparent bg-clip-text text-[15px] leading-relaxed font-medium"
                style={{
                  opacity: glowOpacity,
                  backgroundImage:
                    "linear-gradient(180deg, #b9c4d0 0%, #cbd6e0 30%, #ffffff 50%, #d8e2ea 70%, #b9c4d0 100%)",
                  backgroundSize: "100% 260%",
                  backgroundPositionY: bgY,
                }}
              >
                {description}
              </motion.p>
            )}
            {skills && skills.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center relative z-10">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="group/chip inline-flex items-center gap-1.5 bg-[#1c3a26] border border-[#22c55e]/30 hover:border-[#22c55e]/70 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-[#d9ffe0] hover:text-white shadow-[0_2px_10px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#33d95e] shadow-[0_0_6px_rgba(51,217,94,0.9)] opacity-70 group-hover/chip:opacity-100 transition-opacity" />
                    {skill}
                  </span>
                ))}
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
          className="text-secondary text-[20px] max-w-6xl leading-[30px]"
        >
          I'm a software engineer who builds interfaces people actually use, and
          stays close to the customer while doing it. My core craft is React and
          TypeScript, component architecture, clean UI, API integration, but I
          don't stop at the frontend boundary. I've been the sole technical
          owner inside enterprise client environments, including Fortune 500
          pharmaceutical accounts, debugging live production issues and shipping
          fixes directly.
          <br />
          <br />
          I also build AI into what I ship, not just around it. I led the
          technical rollout of generative AI features on Azure OpenAI, including
          a RAG-based knowledge retrieval system that cut search time 50% and
          resolution time 25%. Outside of work, I prototype with Claude Code,
          Codex and local LLMs, and build tools like a React-based 3D model
          inspector and a voice-driven analytics dashboard.
          <br />
          <br />
          I'm driven by closing the gap between what engineering builds and what
          the customer actually experiences - let's connect.
        </p>
      </motion.div>

      <div className="relative flex justify-evenly flex-wrap">
        {/* Aurora light shimmering behind all cards, spreading and fading into
            the dark around the edges */}
        <div
          aria-hidden="true"
          className="absolute -inset-x-[25rem] -inset-y-24 pointer-events-none"
          style={{
            mixBlendMode: "screen",
            maskImage:
              "radial-gradient(90% 60% at 50% 50%, #000 35%, rgba(0,0,0,0.6) 70%, transparent 88%)",
            WebkitMaskImage:
              "radial-gradient(90% 60% at 50% 50%, #000 35%, rgba(0,0,0,0.6) 70%, transparent 88%)",
          }}
        >
          {/* Layer 1: emerald pool over the left card and beyond */}
          <motion.div
            animate={{ x: [-110, 120, -110], opacity: [0.4, 0.68, 0.4] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[-4%] top-[8%] h-[80%] w-[48%] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(52,211,153,0.55) 0%, rgba(34,197,94,0.22) 45%, transparent 74%)",
              filter: "blur(50px)",
            }}
          />
          {/* Layer 2: teal pool over the right card and beyond */}
          <motion.div
            animate={{ x: [120, -130, 120], opacity: [0.4, 0.66, 0.4] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute right-[-4%] top-[14%] h-[72%] w-[46%] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(45,212,191,0.5) 0%, rgba(45,212,191,0.2) 45%, transparent 74%)",
              filter: "blur(58px)",
            }}
          />
          {/* Layer 3: blue/purple pool across the center card */}
          <motion.div
            animate={{ x: [-70, 90, -70], y: [12, -16, 12], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute left-[26%] bottom-[2%] h-[72%] w-[48%] rounded-full"
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
