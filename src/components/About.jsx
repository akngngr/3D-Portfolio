import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants/constants";
import { textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

import Frontend from "../assets/frontend.jpg";

// Variants for hover animation
const titleVariants = {
  initial: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  hover: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const infoVariants = {
  initial: { opacity: 0, y: 10 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const skillsChipVariants = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.3, type: "spring", stiffness: 300 },
  },
};

const ServiceCard = ({ index, title, icon, description, skills, background }) => {
  return (
    <Tilt
      className="xs:w-[320px] w-full"
      options={{
        max: 45,
        scale: 1,
        speed: 450,
      }}
    >
      <motion.div
        initial="initial"
        whileHover="hover"
        className="relative w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div className="relative bg-tertiary rounded-[20px] py-6 px-8 min-h-[400px] flex justify-center items-center transition-all duration-300">
          {/* Title shown by default, centered vertically and horizontally */}
          <motion.div variants={titleVariants} className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <h3 className="text-secondary text-[20px] font-bold text-center">{title}</h3>
          </motion.div>

          {/* Hidden info revealed on hover */}
          <motion.div
            variants={infoVariants}
            className="absolute inset-0 flex flex-col justify-evenly items-center p-5 opacity-0 hover:opacity-100 transition-opacity duration-300"
          >
            {icon && (
              <img src={icon} alt={title} className="w-20 h-20 object-contain mb-4" />
            )}
            {description && (
              <p className="text-secondary text-[14px] text-center mb-4">
                {description}
              </p>
            )}
            {skills && skills.length > 0 && (
              <div className="flex flex-wrap justify-start gap-3 mt-4">
                {skills.map((skill, idx) => (
                  <motion.div
                    variants={skillsChipVariants}
                    className="bg-secondary text-primary px-4 py-2 rounded-full text-[14px] font-semibold"
                    key={idx}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="mt-6">
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={textVariant()}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm a seasoned software developer and support engineer with extensive
        experience in crafting innovative digital solutions. My background
        spans responsive web applications, interactive e-learning modules, custom
        game mods, and AI-driven functionalities. Thriving in fast-paced Agile
        environments, I quickly adapt to new challenges and collaborate with
        product and development teams to deliver high-performance, user-centric
        solutions.
      </motion.p>

      <div className="mt-20 flex flex-wrap justify-evenly gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");