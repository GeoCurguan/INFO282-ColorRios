import { OBJETO, COMUNA, COLORINFO } from "../constants/properties";
import { useState, useEffect } from "react";
const useFilters = () => {
  const [filters, setFilters] = useState({
    objeto: "todos",
    comuna: "todos",
  });

  console.log("filters", filters);

  const filterColors = (colors) => {
    return colors.filter((color) => {
      if (filters.objeto === "todos" && filters.comuna === "todos") {
        return true;
      } else {
        const currentColorObject = color[OBJETO];
        if (currentColorObject === undefined || currentColorObject === "") {
          return false;
        }

        // Filtrar por objeto: Objeto seleccionado pero comuna "todos"
        if (filters.objeto !== "todos" && filters.comuna === "todos") {
          return currentColorObject.toLowerCase().includes(filters.objeto);
        }
        const currentColorComuna = color[COMUNA];
        if (currentColorComuna === undefined || currentColorComuna === "") {
          return false;
        }

        // Filtrar por comuna: Comuna seleccionada pero objeto "todos"
        if (filters.objeto === "todos" && filters.comuna !== "todos") {
          return currentColorComuna.toLowerCase().includes(filters.comuna);
        }

        // Filtrar por objeto y comuna: Objeto y comuna seleccionados
        return (
          currentColorComuna.toLowerCase().includes(filters.comuna) &&
          currentColorObject.toLowerCase().includes(filters.objeto)
        );
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
