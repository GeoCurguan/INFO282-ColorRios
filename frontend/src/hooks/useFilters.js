import { COLORINFO } from "../constants/properties";
import { useState } from "react";

const useFilters = () => {
  const [filters, setFilters] = useState({
    objeto: "todos",
    comuna: "todos",
    estacion: "todos",
    color: "todos",
  });

  const filterColors = (colors) => {
    return colors.filter((color) => {
      const colorCategory = color[COLORINFO.category];
      const colorComuna = color[COLORINFO.comuna];
      const colorSeason = color[COLORINFO.season];
      const colorFilter = color[COLORINFO.colorFilter];
      if (
        (filters.objeto === "todos" || (colorCategory && colorCategory.toLowerCase() === filters.objeto)) &&
        (filters.comuna === "todos" || (colorComuna && colorComuna.toLowerCase() === filters.comuna)) &&
        (filters.estacion === "todos" || (colorSeason && colorSeason.toLowerCase() === filters.estacion)) &&
        (filters.color === "todos" || (colorFilter && colorFilter.toLowerCase() === filters.color))
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
