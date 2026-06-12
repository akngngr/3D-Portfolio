import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { services } from "../constants/constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";

// ServiceCard component without tilt; now default (front) shows details
// and the flipped (back) shows the image with the title overlay.
// const ServiceCard = ({ index, title, icon, description, skills, scrollYProgress }) => {
//   // Set a scroll range for the flip animation per card.
//   const flipStart = 0.3 + index * 0.1;
//   const flipEnd = 0.5 + index * 0.1;
//   const rotateY = useTransform(scrollYProgress, [flipStart, flipEnd], [0, 180]);

//   return (
//     <motion.div
//       className="bg-blue-500 to bg-tertiary p-[1px] rounded-[20px] shadow-card border-2 border-white/50"
//       style={{
//         perspective: 1000,
//         width: "320px",
//         height: "400px",
//         margin: "1rem",
//       }}
//     >
//       <motion.div
//         style={{
//           width: "100%",
//           height: "100%",
//           transformStyle: "preserve-3d",
//           rotateY, // Driven by scroll progress for a smooth flip
//           position: "relative",
//         }}
//       >
//         {/* Front Face – Displays details */}
//         <div
//           className="bg-tertiary rounded-[20px] absolute inset-0 overflow-hidden flex flex-col justify-center items-center p-4"
//           style={{
//             backfaceVisibility: "hidden",
//           }}
//         >
//           {description && (
//             <p className="text-secondary text-[14px] text-center mb-4">
//               {description}
//             </p>
//           )}
//           {skills && skills.length > 0 && (
//             <div className="flex flex-wrap justify-center gap-3">
//               {skills.map((skill, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-secondary text-primary px-4 py-2 rounded-full text-[14px] font-semibold"
//                 >
//                   {skill}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Back Face – Uses the image as background with title overlay */}
//         <div
//           className="rounded-[20px] absolute inset-0 overflow-hidden"
//           style={{
//             backfaceVisibility: "hidden",
//             backgroundImage: `url(${icon})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             transform: "rotateY(180deg)",
//           }}
//         >
//           {/* Optional overlay for better text contrast */}
//           <div
//             className="w-full h-full flex justify-center items-center"
//             style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
//           >
//             <h3 className="text-white text-[20px] font-bold text-center px-2 [text-shadow: 0 4px 4px rgb(0 0 0 / 0.8)]">
//               {title}
//             </h3>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };
const ServiceCard = ({ index, title, icon, description, skills }) => {

  return (
    <motion.div
      className="green-gradient card-wrapper h-[400px] w-[320px] m-4 rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
    >
      <motion.div
        className="bg-cover bg-center card-content w-full h-full flex flex-col justify-center items-center transform-style-preserve-3d relative"
      >
        {/* Displays details */}
        <div className="p-6 flex flex-col gap-4 justify-center items-center text-center">
          <h3
            className="text-secondary text-xl font-bold px-5 mb-4 text-center "
          >
            {title}
          </h3>

          {description && (
            <p className="text-white-100 text-sm mb-4">{description}</p>
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

        {/* Uses the image as background with title overlay */}
        {/* <div
          className="bg-cover bg-center relative flex items-end"
          style={{
            backgroundImage: `url(${icon})`,
            width: "100%",
            height: "100%",
          }}
        >

        </div> */}
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
          className="text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
<<<<<<< HEAD
          I'm a seasoned software developer and support engineer with a passion for crafting innovative digital solutions. I build responsive web applications, interactive e-learning modules, custom game mods, and AI-powered functionalities that combine technical excellence with creative flair. Leveraging Agile methodologies, I transform complex challenges into elegant, user-centric interfaces that are as robust as they are engaging. I'm driven by collaboration and continuous learning, and I believe that professionalism can come with a touch of creative fun. Let's connect to design digital experiences that are both efficient and delightfully inspiring!
=======
          I'm a Software Engineer embedded in Support, working across C#/.NET, JavaScript/TypeScript, React, and Python to debug, build, and ship for an enterprise platform serving 7M users. I led the engineering rollout of generative AI features on Azure OpenAI — including a RAG-based knowledge retrieval system that cut KB search time by 50% and ticket resolution time by 25% — and maintain a versioned KQL diagnostic library used across support and engineering. Outside of work, I prototype with Codex and local LLMs, build custom tools like a React-based 3D model inspector, and develop game mods in Lua. I'm driven by closing the gap between what engineering builds and what customers actually experience — let's connect!
>>>>>>> root
        </p>
      </motion.div>

      <div className="flex justify-around flex-wrap">
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            index={index}
            {...service}
          />
        ))}
      </div>
    </div>
  );
}

export default SectionWrapper(About, "about");
