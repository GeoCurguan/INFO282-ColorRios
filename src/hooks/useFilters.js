import { COLORINFO } from "../constants/properties";
import { useState, useEffect } from "react";
const useFilters = () => {
  const [filters, setFilters] = useState({
    objeto: "todos",
  });

  const filterColors = (colors) => {
    return colors.filter((color) => {
      if (filters.objeto === "todos") {
        return true;
      } else {
        return color[COLORINFO.objeto].toLowerCase().includes(filters.objeto); // "Objeto Vegetal".toLowerCase().includes("vegetal")
      }
    });
  };

  return {
    filters,
    filterColors,
    setFilters,
  };
};

export default useFilters;
