import React, { useLayoutEffect, useState } from "react";
export const useWindowPosition = async () => {
  const [scrollPosition, setPosition] = useState(0);
  useLayoutEffect(() => {
    function updatePosition() {
      setPosition(window.pageYOffset);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  console.log(scrollPosition);
  return scrollPosition;
};
