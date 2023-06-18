import React from 'react'
import CaretIcon from '/caretsvg.svg'

const Caret = () => {

  const handleScroll = () => {
    var rootElement = document.documentElement;
    var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if ((rootElement.scrollTop / scrollTotal ) > 0.80 ) {
      var scrollBtn = document.querySelector("#scrollToTop");
    }
  }

  return (
    <div id='scrollToTop' className="md:block absolute bottom-10 right-0 rounded-full bg-green-700 sm:hidden hover:-translate-y-3 cursor-pointer ease-in-out duration-200">
        <a onClick={() => {
            handleScroll();
            window.scrollTo({
              top: 0,
              behavior: "smooth"            
          }); // Scroll to the top of the page
          }}><img src={CaretIcon} alt="caret" /></a>
    </div>
  )
}

export default Caret