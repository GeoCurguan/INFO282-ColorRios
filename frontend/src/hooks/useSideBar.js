import { useState, useEffect } from "react";
const useSideBar = () => {
  const [currentColor, setCurrentColor] = useState(null);
  const [openFilters, setOpenFilters] = useState(false);
  const [classNameObject, setClassNameObject] = useState({
    colorDetail: { detailTransition: "detail-inactive" },
    filtersDrawer: { detailTransition: "detail-inactive" },
  });
  const [widthColors, setWidthColors] = useState("colors-inactive");

  useEffect(() => {
    if (currentColor) {
      setClassNameObject({ ...classNameObject, colorDetail: { detailTransition: "detail-active" } });
      setWidthColors("colors-active");
    } else {
      setClassNameObject({ ...classNameObject, colorDetail: { detailTransition: "detail-inactive" } });
      setWidthColors("colors-inactive");
    }
  }, [currentColor]);

  const toggleFilters = async () => {
    const newStateOpenFilters = !openFilters;
    if (newStateOpenFilters) {
      setCurrentColor(null);
      setClassNameObject({ ...classNameObject, colorDetail: { detailTransition: "detail-inactive" } });
    }
    setOpenFilters(newStateOpenFilters);
  };

  useEffect(() => {
    if (openFilters) {
      setClassNameObject({ ...classNameObject, filtersDrawer: { detailTransition: "detail-active" } });
      setWidthColors("colors-active");
    } else {
      setWidthColors("colors-inactive");
      setClassNameObject({ ...classNameObject, filtersDrawer: { detailTransition: "detail-inactive" } });
    }
  }, [openFilters]);

  return {
    classNameObject,
    openFilters,
    toggleFilters,
    widthColors,
    currentColor,
    setCurrentColor,
  };
};

export default useSideBar;
