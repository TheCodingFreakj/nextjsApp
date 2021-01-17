import React, { useState, useEffect } from "react";

export const useWindowPosition = async () => {
  const [scrollPosition, setPosition] = useState({
    Xposition: "",
    Yposition: "",
  });
  useEffect(() => {
    const updatePosition = () => {
      setPosition({
        Xposition: window.pageXOffset,
        Yposition: window.pageYOffset,
      });
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition; //this is an object
};

//http://javascriptkit.com/javatutors/detect-user-scroll-amount.shtml
