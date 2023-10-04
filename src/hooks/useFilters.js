import { COLORINFO } from "../constants/properties";
import { useState, useEffect } from "react";
const useFilters = () => {
  // Por mientras
  // Por mientras
  // Por mientras
  // Por mientras
  // Por mientras
  const objeto = 0;
  const [filters, setFilters] = useState({
    objeto: "todos",
  });

  const filterColors = (colors) => {
    return colors.filter((color) => {
      if (filters.objeto === "todos") {
        return true;
      } else {
        const currentColorObject = color[objeto];
        if (currentColorObject === undefined || currentColorObject === "") {
          return false;
        }
        return currentColorObject.toLowerCase().includes(filters.objeto);
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
