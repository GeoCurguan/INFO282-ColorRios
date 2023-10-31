import { OBJETO, COMUNA, COLORINFO, ESTACION } from "../constants/properties";
import { useState } from "react";
const useFilters = () => {
  const [filters, setFilters] = useState({
    objeto: "todos",
    comuna: "todos",
    estacion: "todos",
  });

  const filterColors = (colors) => {
    return colors.filter((color) => {
      if (
        (filters.objeto === "todos" || color[OBJETO].toLowerCase().includes(filters.objeto)) &&
        (filters.comuna === "todos" || color[COMUNA].toLowerCase().includes(filters.comuna)) &&
        (filters.estacion === "todos" || color[ESTACION].toLowerCase().includes(filters.estacion))
      ) {
        return true;
      }
      return false;
    });
  };

  return {
    filters,
    filterColors,
    setFilters,
  };
};

export default useFilters;
