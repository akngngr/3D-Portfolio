import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { services } from "../constants/constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";

const ServiceCard = ({ index, title, icon, description, skills }) => {
  return (
    <motion.div className="green-gradient card-wrapper h-[500px] w-[350px] m-4 rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <motion.div className="bg-cover bg-center card-content w-full h-full flex flex-col justify-center items-center transform-style-preserve-3d relative">
        {/* Displays details */}
        <div className="p-6 flex flex-col gap-4 justify-center items-center text-center">
          <h3 className="text-secondary text-xl font-bold px-5 mb-4 text-center ">
            {title}
          </h3>

          {description && (
            <p className="text-white-100 text-lg mb-4">{description}</p>
          )}
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-secondary text-tertiary px-3 py-2 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// About component with scroll-driven flip and additional top spacing for cards.
function About() {
  // Attach a ref to track scroll progress within this section.
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={sectionRef} className="flex flex-col gap-10">
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

      <div className="flex justify-evenly flex-wrap">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  );
}

export default SectionWrapper(About, "about");
