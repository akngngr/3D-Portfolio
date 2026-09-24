import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import Caret from "./Caret";

const Aurora = () => (
  <div
    aria-hidden="true"
    className="absolute inset-0 overflow-hidden pointer-events-none"
    style={{
      mixBlendMode: "screen",
      // fade a wide zone around every edge so pools melt into the background
      maskImage:
        "radial-gradient(140% 130% at 50% 50%, #000 40%, rgba(0,0,0,0.75) 62%, rgba(0,0,0,0.35) 82%, transparent 100%)",
      WebkitMaskImage:
        "radial-gradient(140% 130% at 50% 50%, #000 40%, rgba(0,0,0,0.75) 62%, rgba(0,0,0,0.35) 82%, transparent 100%)",
    }}
  >
    {/* blurred aurora pools, drifting like light, all kept inside the
        container so the mask (not clipping) fades the edges smoothly */}
    <motion.div
      animate={{ x: [-70, 90, -70], opacity: [0.45, 0.75, 0.45] }}
      transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-[2%] top-[6%] h-[88%] w-[64%] rounded-full"
      style={{
        background:
          "radial-gradient(closest-side, rgba(52,211,153,0.55) 0%, rgba(34,197,94,0.22) 45%, transparent 74%)",
        filter: "blur(60px)",
      }}
    />
    <motion.div
      animate={{ x: [80, -90, 80], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute right-[2%] top-[10%] h-[78%] w-[62%] rounded-full"
      style={{
        background:
          "radial-gradient(closest-side, rgba(45,212,191,0.5) 0%, rgba(45,212,191,0.2) 45%, transparent 74%)",
        filter: "blur(68px)",
      }}
    />
    <motion.div
      animate={{ x: [-50, 60, -50], y: [14, -18, 14], opacity: [0.3, 0.55, 0.3] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute left-[30%] bottom-[4%] h-[80%] w-[58%] rounded-full"
      style={{
        background:
          "radial-gradient(closest-side, rgba(129,140,248,0.5) 0%, rgba(96,165,250,0.18) 48%, transparent 76%)",
        filter: "blur(72px)",
      }}
    />
  </div>
);

const Contact = () => {
  const formRef = useRef();
  const cardRef = useRef(null);
  // border ring sweeps opposite to scroll, same as About/Experience cards
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const ringAngle = useTransform(scrollYProgress, [0, 1], ["150deg", "-150deg"]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Lazy-load emailjs only when the form is actually submitted
    const emailjs = (await import("@emailjs/browser")).default;

    emailjs
      .send(
         import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
         import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Akin",
          form_email: form.email,
          to_email: "akingungor@yahoo.com",
          message: form.message,
        },
         import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.log(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  const inputClasses =
    "w-full bg-white/[0.04] py-3.5 px-5 sm:py-4 sm:px-6 placeholder:text-white/30 text-white text-[14px] rounded-xl outline-none border border-white/10 focus:border-[#22c55e]/60 focus:bg-white/[0.06] focus:shadow-[0_0_24px_rgba(34,197,94,0.18)] focus:scale-[1.01] ease-out duration-300";

  return (
    <div className="relative w-full overflow-hidden">
      {/* Aurora orbs as the section background */}
      <Aurora />

      {/* Centered, modern form over the aurora */}
      <div className="relative z-10 flex items-center justify-center py-16">
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="relative w-full max-w-2xl rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85),0_15px_50px_-15px_rgba(0,20,10,0.7)]"
          style={{ "--ring-angle": ringAngle }}
        >
          <div className="exp-ring rounded-3xl">
            <div className="exp-body !bg-[#0d1a11] !m-[2px] rounded-[calc(1.5rem-2px)] px-8 py-10 sm:px-12">
              <div className="text-center">
                <p className={styles.sectionSubText}>Get in touch</p>
                <h3 className={styles.sectionHeadText}>Contact.</h3>
                <p className="mt-3 text-[13px] sm:text-[15px] text-white/60 leading-relaxed">
                  Have a project, a role, or just a question? My inbox is always
                  open. I'll get back to you as soon as I can.
                </p>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="mt-10 flex flex-col gap-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="flex flex-col">
                    <span className="text-white/90 font-medium mb-2.5 text-[13px]">
                      Your Name
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="What's your name?"
                      className={inputClasses}
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-white/90 font-medium mb-2.5 text-[13px]">
                      Your Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="What's your email?"
                      className={inputClasses}
                    />
                  </label>
                </div>
                <label className="flex flex-col">
                  <span className="text-white/90 font-medium mb-2.5 text-[13px]">
                    Your Message
                  </span>
                  <textarea
                    rows="6"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What do you want to say?"
                    className={inputClasses}
                  />
                </label>
                <button
                  type="submit"
                  className="relative overflow-hidden group w-full bg-[#22c55e] py-3.5 sm:py-4 outline-none text-[#02010A] text-[15px] font-bold rounded-xl shadow-[0_0_28px_rgba(34,197,94,0.4)] hover:bg-[#4ade80] hover:scale-[1.02] ease-out duration-300 focus:scale-[1.02] active:scale-100 disabled:opacity-60 disabled:pointer-events-none"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                  <motion.div
                    animate={{ x: ["-180%", "220%"], opacity: [0, 1, 1, 0] }}
                    transition={{
                      x: { duration: 4.5, ease: "linear", repeat: Infinity },
                      opacity: {
                        duration: 4.5,
                        times: [0, 0.4, 0.68, 1],
                        ease: "linear",
                        repeat: Infinity,
                      },
                    }}
                    className="absolute inset-y-0 left-0 w-1/2 pointer-events-none"
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        background:
                          "linear-gradient(100deg, transparent, rgba(255,255,255,0.5), transparent)",
                        transform: "skewX(-18deg)",
                      }}
                    />
                  </motion.div>
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
      <Caret />
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
