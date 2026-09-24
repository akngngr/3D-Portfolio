import React from 'react'
import CaretIcon from '/caretsvg.svg'

const Caret = () => {
  const handleScroll = () => {
    var rootElement = document.documentElement;
    var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if (rootElement.scrollTop / scrollTotal > 0.8) {
      var scrollBtn = document.querySelector("#scrollToTop");
    }
  };

  return (
    <div
      id="scrollToTop"
      className="md:block absolute bottom-3 right-3 rounded-full bg-green-700 sm:hidden cursor-pointer"
    >
      <a
        href="#top"
        aria-label="Scroll to top"
        onClick={(e) => {
          e.preventDefault();
          handleScroll();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <img
          src={CaretIcon}
          width="28"
          height="28"
          className="hover:-translate-y-1 ease-in-out duration-200"
          alt="Scroll to top"
        />
      </a>
    </div>
  );
};

export default Caret