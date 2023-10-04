import React, { useState } from "react";
import { RGB } from "@/constants/properties";
import { colorRGB, colorRGBExist } from "@/utils";
import styles from "./styles/Color.module.css";

const Color = ({ color, setCurrentColor, isSelected }) => {
  // Comprueba si R, G o B son undefined y si es así, no renderiza el cuadrito
  if (!colorRGBExist(color[RGB.R], color[RGB.G], color[RGB.B])) {
    return null;
  }

  const handleCurrentColor = () => {
    setCurrentColor(color);
  };

  const styleBG = colorRGB(color[RGB.R], color[RGB.G], color[RGB.B]);

  return (
    <div className={`hover:z-[1] w-1/5 ${isSelected ? styles["selected-color-border"] : ""}`}>
      {/*---Color---*/}
      <div
        className="fade-in transition-all duration-1000 bg-white p-20 shadow-lg  transform hover:scale-110 cursor-pointer aspect-square"
        style={styleBG}
        onClick={handleCurrentColor}
      ></div>
    </div>
  );
};

export default Color;
