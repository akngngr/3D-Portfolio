import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { styles } from "../styles";
import { navLinks } from "../constants/constants.js";
import { alogo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav
      className={`
      ${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary 
    `}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
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
          <div className="relative w-12 h-12 overflow-hidden rounded-xl">
            <img
              src={alogo}
              alt="Akın Gungor"
              width="48"
              height="48"
              className="w-12 h-12 object-contain"
            />
            <motion.div
              animate={{ x: ["-120%", "160%"] }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="absolute inset-y-0 left-0 w-1/2 pointer-events-none"
            >
              <div
                className="w-full h-full"
                style={{
                  background:
                    "linear-gradient(100deg, transparent, rgba(255,255,255,0.35), transparent)",
                  transform: "skewX(-18deg)",
                }}
              />
            </motion.div>
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
                  onClick={() => setActive(link.title)}
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
            alt="menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-2[140px] z-10 rounded-xl origin-top-right"
              >
                <ul className="list-none flex justify-end items-end flex-col gap-4">
                  {navLinks.map((link, i) =>
                    link.title ? (
                      <motion.li
                        key={link.id}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 16 }}
                        transition={{ duration: 0.18, delay: 0.05 * i }}
                        className={`${
                          active === link.title ? "text-white" : "text-secondary"
                        } font-poppins font-medium cursor-pointer text-[16px] hover:text-white transition-colors`}
                        onClick={() => {
                          setToggle(!toggle);
                          setActive(link.title);
                        }}
                      >
                        <a href={`#${link.id}`}>{link.title}</a>
                      </motion.li>
                    ) : (
                      <motion.li
                        key={link.id}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 16 }}
                        transition={{ duration: 0.18, delay: 0.05 * i }}
                        className="font-poppins font-medium cursor-pointer text-[16px]"
                        onClick={() => setToggle(!toggle)}
                      >
                        <a href={link.url} aria-label={link.id}>
                          <img src={link.icon} alt={link.id} className="h-6 w-6" />
                        </a>
                      </motion.li>
                    )
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
