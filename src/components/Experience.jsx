import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants/constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const PlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-4 h-4"
  >
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);

const ExperienceCard = ({ experience, index }) => {
  const [open, setOpen] = useState(false);
  const cardRef = useRef(null);
  // Progress of the whole card, drives the border ring opposite to scroll
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const ringAngle = useTransform(scrollYProgress, [0, 1], ["150deg", "-150deg"]);

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "transparent",
        color: "#fff",
        border: "none",
        padding: 0,
        boxShadow: "none",
      }}
      contentArrowStyle={{ borderRight: "7px solid rgba(34, 197, 94, 0.25)" }}
      date={experience.date}
      dateClassName="exp-date"
      iconStyle={{
        background: "#0a120d",
        border: "2px solid rgba(34, 197, 94, 0.6)",
        boxShadow: "0 0 0 6px rgba(34,197,94,0.12), 0 0 24px rgba(34,197,94,0.25)",
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full rounded-full overflow-hidden">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-full h-full object-contain scale-90 rounded-full"
          />
        </div>
      }
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.08 * index }}
        className="relative rounded-3xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]"
        style={{ "--ring-angle": ringAngle }}
      >
        <div className="exp-ring rounded-3xl">
          <div className="exp-body">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[#22c55e]/60 rounded-xl transition-transform duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-white text-[18px] sm:text-[22px] font-bold leading-snug">
                    {experience.title}
                  </h3>
                  <p
                    className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-[13px] sm:text-[15px] font-semibold tracking-wide"
                    style={{ margin: 0 }}
                  >
                    {experience.company_name}
                  </p>
                </div>
                <span
                  className="mt-1 shrink-0 w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/80 transition-transform duration-300"
                  style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  <PlusIcon />
                </span>
              </div>
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <ul className="mt-3 space-y-2 sm:mt-5 sm:space-y-3">
                  {experience.points.map((point, pi) => (
                    <li
                      key={`experience-point-${pi}`}
                      className="flex items-start gap-3 text-white-100 text-[13px] leading-[19px] sm:text-[14px] sm:leading-relaxed tracking-wide"
                    >
                      <span
                        className="mt-[6px] shrink-0 w-[6px] h-[6px] rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const timelineRef = useRef(null);
  // Drives the shine sweeping down the timeline spine as you scroll
  const { scrollYProgress: spineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  const spineShine = useTransform(spineProgress, [0, 1], ["-10%", "110%"]);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>What I have done so far</p>
        <h2 className={`${styles.sectionHeadText}`}>Work Experience.</h2>
      </motion.div>

      <div className="mt-10 flex flex-col sm:mt-20">
        <motion.div ref={timelineRef} style={{ "--spine-shine": spineShine }}>
          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} index={index} />
            ))}
          </VerticalTimeline>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");