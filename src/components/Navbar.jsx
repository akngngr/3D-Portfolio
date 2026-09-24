import React, { useEffect, useState } from "react";

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
        <a
          href="#top"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0); // Scroll to the top of the page
          }}
        >
          <img src={alogo} alt="Akın Gungor" className="w-12 h-12 object-contain" />
          <p className="text-white text-[18] font-bold cursor-pointer flex">
            Akın &nbsp;
            <span className="sm:block hidden">Gungor</span>
          </p>
        </a>
        <ul className="list-none hidden md:flex flex-row gap-10">
          {navLinks.map((link) =>
            link.title ? (
              <li
                key={link.id}
                className={`${active === link.title ? "text-white" : "text-secondary"
                  } hover:text-white text-[18px] font-medium cursor-pointer hover:scale-125 ease-out duration-300`}
                onClick={() => setActive(link.title)}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ) : (
              <li key={link.id} className="flex items-center">
                <a href={link.url} aria-label={link.id}>
                  <img src={link.icon} alt={link.id} className="h-6 w-6" />
                </a>
              </li>
            )
          )}
        </ul>
        <div className="md:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          {/* Mobile nav */}
          <div
            className={`${!toggle ? "hidden" : "flex"
              } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-2[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-end flex-col gap-4">
              {navLinks.map((link) =>
                link.title ? (
                  <li
                    key={link.id}
                    className={`${active === link.title ? "text-white" : "text-secondary"
                      } font-poppins font-medium cursor-pointer text-[16px]`}
                    onClick={() => {
                      setToggle(!toggle);
                      setActive(link.title);
                    }}
                  >
                    <a href={`#${link.id}`}>{link.title}</a>
                  </li>
                ) : (
                  <li
                    key={link.id}
                    className="font-poppins font-medium cursor-pointer text-[16px]"
                    onClick={() => setToggle(!toggle)}
                  >
                    <a href={link.url} aria-label={link.id}>
                      <img src={link.icon} alt={link.id} className="h-6 w-6" />
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
