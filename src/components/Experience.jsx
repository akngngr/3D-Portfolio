import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants/constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience, index }) => {
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
            <div className="flex flex-col gap-1">
              <h3 className="text-white text-[22px] font-bold leading-snug">
                {experience.title}
              </h3>
              <p
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-[15px] font-semibold tracking-wide"
                style={{ margin: 0 }}
              >
                {experience.company_name}
              </p>
            </div>

            <ul className="mt-5 space-y-3">
              {experience.points.map((point, pi) => (
                <li
                  key={`experience-point-${pi}`}
                  className="flex items-start gap-3 text-white-100 text-[14px] leading-relaxed tracking-wide"
                >
                  <span
                    className="mt-[7px] shrink-0 w-[6px] h-[6px] rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
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

      <div className="mt-20 flex flex-col">
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