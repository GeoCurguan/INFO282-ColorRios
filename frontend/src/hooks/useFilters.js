import { OBJETO, COMUNA, COLORINFO, ESTACION } from "../constants/properties";
import { useState } from "react";
import { colorsNCS } from "@/constants/colors";

const ncsToColor = (nuance, hue) => {
  const color = colorsNCS[hue];
  const nuanceLength = nuance.length;
  let nuanceBlackness;
  let nuanceChroma;
  let nuanceWhite;
  if (nuanceLength === 4) {
    nuanceBlackness = Number(nuance.slice(0, 2));
    nuanceChroma = nuance.slice(2, 4);
    nuanceWhite = 100 - (Number(nuanceBlackness) + Number(nuanceChroma));
  }

  // Cafés y Rosados
  if (color && nuanceBlackness && ["Amarillos", "Naranjos", "Rojos"].includes(color)) {
    if (nuanceBlackness >= 70) return "Cafés";
    if (color === "Rojos" && nuanceBlackness <= 20) return "Rosados";
    return color;
  }
  // Blancos
  if (nuanceWhite && nuanceWhite >= 80) return "Blancos";
  // Grises
  if ((nuanceWhite && nuanceWhite >= 70) || (nuanceChroma && nuanceChroma <= 5)) return "Grises";
  return color;
};

const useFilters = () => {
  const [filters, setFilters] = useState({
    objeto: "todos",
    comuna: "todos",
    estacion: "todos",
    color: "todos",
  });

  const filterColors = (colors) => {
    return colors.filter((color) => {
      if (
        (filters.objeto === "todos" || color[OBJETO].toLowerCase().includes(filters.objeto)) &&
        (filters.comuna === "todos" || color[COMUNA].toLowerCase().includes(filters.comuna)) &&
        (filters.estacion === "todos" || color[ESTACION].toLowerCase().includes(filters.estacion)) &&
        (filters.color === "todos" || ncsToColor(color[COLORINFO.ncsNuance], color[COLORINFO.ncsHue]) === filters.color)
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
