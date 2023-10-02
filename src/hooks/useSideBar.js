import { useState, useEffect } from "react";
const useSideBar = () => {
  const [currentColor, setCurrentColor] = useState(null);
  const [widthColors, setWidthColors] = useState("colors-inactive");
  const [detailTransition, setDetailTransition] = useState("test-transition-off");

  useEffect(() => {
    if (currentColor) {
      setWidthColors("colors-active");
      setDetailTransition("detail-active");
      console.log(currentColor[34]);
    } else {
      setWidthColors("colors-inactive");
      setDetailTransition("detail-inactive");
      console.log("Color cerrado");
    }
  }, [currentColor]);

  return {
    widthColors,
    detailTransition,
    currentColor,
    setCurrentColor,
  };
};

export default useSideBar;
