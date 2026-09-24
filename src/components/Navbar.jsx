import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { styles } from "../styles";
import { navLinks } from "../constants/constants.js";
import { menu, close } from "../assets";
import AnimatedLogo from "./AnimatedLogo";

const itemVariant = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoHover, setLogoHover] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section links scroll to the section top by default, but the contact form
  // is centered inside its section, so center it vertically on screen instead.
  const handleNavClick = (e, link) => {
    setActive(link.title);
    setToggle(false);

    if (link.id === "contact") {
      e.preventDefault();
      const section = document.getElementById("contact")?.closest("section");
      section?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <nav
      className={`
      ${styles.paddingX} w-full flex flex-col fixed top-0 z-20 bg-primary 
    `}
    >
      <div className="w-full flex justify-between items-center py-5 max-w-7xl mx-auto">
        <motion.a
          href="#top"
          className="flex items-center"
          aria-label="Akın Gungor, back to top"
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0); // Scroll to the top of the page
          }}
        >
          <div
            className="relative w-12 h-12 overflow-hidden rounded-xl"
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
          >
            {/* Aurora backdrop: green light-curtains flowing left -> right
                behind the mountain range while hovering */}
            <motion.div
              aria-hidden="true"
              animate={{ opacity: logoHover ? 1 : 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 pointer-events-none"
            >
              {/* soft base glow, breathing under the range */}
              <motion.div
                className="absolute inset-0"
                animate={logoHover ? { opacity: [0.5, 1, 0.5] } : { opacity: 0 }}
                transition={{
                  duration: 4.5,
                  repeat: logoHover ? Infinity : 0,
                  ease: "easeInOut",
                }}
                style={{
                  background:
                    "radial-gradient(circle at 50% 70%, rgba(45,212,191,0.4), transparent 62%)",
                }}
              />
              {/* aurora curtain crossing the whole box, left to right */}
              <div className="absolute -top-[30%] left-0 w-6 h-[160%] -skew-x-6">
                <motion.div
                  className="absolute inset-0"
                  animate={
                    logoHover
                      ? {
                          x: [-32, 56],
                          y: [0, 3, 0],
                          opacity: [0, 0.9, 0.9, 0],
                        }
                      : { x: -32, opacity: 0 }
                  }
                  transition={{
                    x: {
                      duration: 3.6,
                      ease: "linear",
                      repeat: logoHover ? Infinity : 0,
                    },
                    y: {
                      duration: 3.6,
                      repeat: logoHover ? Infinity : 0,
                      ease: "easeInOut",
                    },
                    opacity: {
                      duration: 3.6,
                      times: [0, 0.28, 0.72, 1],
                      ease: "easeInOut",
                      repeat: logoHover ? Infinity : 0,
                    },
                  }}
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, rgba(134,239,172,0.85), rgba(45,212,191,0.5), transparent)",
                    filter: "blur(10px)",
                  }}
                />
              </div>
              {/* second curtain, slower so the two drift out of phase */}
              <div className="absolute -top-[30%] left-0 w-4 h-[160%] skew-x-4">
                <motion.div
                  className="absolute inset-0"
                  animate={
                    logoHover
                      ? {
                          x: [-24, 60],
                          y: [0, -3, 0],
                          opacity: [0, 0.6, 0.6, 0],
                        }
                      : { x: -24, opacity: 0 }
                  }
                  transition={{
                    x: {
                      duration: 4.8,
                      ease: "linear",
                      repeat: logoHover ? Infinity : 0,
                    },
                    y: {
                      duration: 4.8,
                      repeat: logoHover ? Infinity : 0,
                      ease: "easeInOut",
                    },
                    opacity: {
                      duration: 4.8,
                      times: [0, 0.28, 0.72, 1],
                      ease: "easeInOut",
                      repeat: logoHover ? Infinity : 0,
                    },
                  }}
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, rgba(74,222,128,0.75), rgba(134,239,172,0.4), transparent)",
                    filter: "blur(11px)",
                  }}
                />
              </div>
            </motion.div>
            <AnimatedLogo className="relative w-12 h-12" />
          </div>
        </motion.a>
        <ul className="list-none hidden md:flex flex-row gap-8">
          {navLinks.map((link) =>
            link.title ? (
              <li key={link.id} className="relative group">
                <motion.a
                  href={`#${link.id}`}
                  className={`relative inline-flex items-center text-[17px] font-medium transition-colors duration-300 ${
                    active === link.title
                      ? "text-white"
                      : "text-secondary group-hover:text-white"
                  }`}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  onClick={(e) => handleNavClick(e, link)}
                >
                  {link.title}
                  {/* Animated underline, a green mark that slides in on hover/active */}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] rounded-full bg-[#22c55e] transition-all duration-300 ${
                      active === link.title
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }`}
                  />
                </motion.a>
              </li>
            ) : (
              <li key={link.id} className="flex items-center">
                <motion.a
                  href={link.url}
                  aria-label={link.id}
                  whileHover={{ scale: 1.15, y: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="block p-0.5 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <img src={link.icon} alt={link.id} className="h-6 w-6" />
                </motion.a>
              </li>
            )
          )}
        </ul>
        <div className="md:hidden flex flex-1 justify-end items-center">
          <motion.img
            src={toggle ? close : menu}
            alt={toggle ? "Close menu" : "Open menu"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
        </div>
      </div>

      {/* Mobile menu: flies out horizontally inside the fixed header bar */}
      <div className="w-full max-w-7xl mx-auto md:hidden">
        <AnimatePresence>
          {toggle && (
            <motion.div
              key="nav-flyout"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden border-t border-white/10"
            >
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                }}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  {navLinks
                    .filter((l) => l.title)
                    .map((link) => (
                      <motion.a
                        key={link.id}
                        variants={itemVariant}
                        href={`#${link.id}`}
                        onClick={(e) => handleNavClick(e, link)}
                        className={`group relative py-1 text-[13px] uppercase tracking-wider font-medium transition-colors ${
                          active === link.title
                            ? "text-white"
                            : "text-secondary hover:text-white"
                        }`}
                      >
                        {link.title}
                        <span
                          className={`absolute left-0 bottom-0 h-[2px] rounded-full bg-[#22c55e] transition-all duration-300 ${
                            active === link.title
                              ? "w-full opacity-100"
                              : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                          }`}
                        />
                      </motion.a>
                    ))}
                </div>
                <motion.div variants={itemVariant} className="flex items-center gap-2.5">
                  {navLinks
                    .filter((l) => !l.title)
                    .map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        aria-label={link.id}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center hover:bg-[#22c55e]/15 hover:border-[#22c55e]/40 transition-colors"
                      >
                        <img src={link.icon} alt={link.id} className="h-4 w-4" />
                      </a>
                    ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
