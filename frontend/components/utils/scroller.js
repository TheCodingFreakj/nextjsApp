import React, { useEffect, useState } from "react";
export const useWindowPosition = async () => {
  const [scrollPosition, setPosition] = useState({
    Xposition: "",
    Yposition: "",
  });
  useEffect(() => {
    function updatePosition() {
      setPosition({
        Xposition: window.pageXOffset,
        Yposition: window.pageYOffset,
      });
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition; //this is an object
};

//http://javascriptkit.com/javatutors/detect-user-scroll-amount.shtml
