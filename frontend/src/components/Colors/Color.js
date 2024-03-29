import React, { useState } from "react";
import { RGB, COLORINFO } from "@/constants/properties";
import { colorRGB, colorRGBExist } from "@/utils";
import styles from "./styles/Color.module.css";

const Color = ({ color, setCurrentColor, isSelected }) => {
  // Comprueba si R, G o B son undefined y si es así, no renderiza el cuadrito
  if (!colorRGBExist(color[COLORINFO.rgbR], color[COLORINFO.rgbG], color[COLORINFO.rgbB])) {
    return null;
  }

  const sendData = async () => {
    // Manda el /colorId al backend para registrar clicks
    try {
      const colorId = color.id;
      const response = await fetch(`/api/getClickColorId/${colorId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCurrentColor = () => {
    setCurrentColor(color);
    // console.log(color);
    sendData();
  };

  const styleBG = colorRGB(color[COLORINFO.rgbR], color[COLORINFO.rgbG], color[COLORINFO.rgbB]);

  return (
    <div className={`hover:z-[1] w-1/5 ${isSelected ? styles["selected-color-border"] : ""}`}>
      {/*---Color---*/}
      <div
        className="fade-in transition-all duration-1000 bg-white w-full shadow-lg  transform hover:scale-110 cursor-pointer aspect-square"
        style={styleBG}
        onClick={handleCurrentColor}
      ></div>
    </div>
  );
};

export default Color;
