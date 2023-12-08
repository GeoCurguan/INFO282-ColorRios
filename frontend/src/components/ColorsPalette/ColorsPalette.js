import { useState, useEffect } from "react";
import styles from "./styles/ColorsPalette.module.css";
import { COLORINFO } from "@/constants/properties";
import { rgbToHex } from "@/utils";

import ExportPDF from "../ExportPDF/ExportPDF";

const ColorsPalette = ({ colorToPalette }) => {
  const [favoriteColors, setFavoriteColors] = useState([]);

  function removeColorToPalette(colorIdx) {
    setFavoriteColors((prevColors) => prevColors.filter((_, index) => index !== colorIdx));
  }

  useEffect(() => {
    if (colorToPalette && !favoriteColors.includes(colorToPalette)) {
      setFavoriteColors((prevColors) => [...prevColors, colorToPalette]);
    }
  }, [colorToPalette]);

  const Palette = [];
  for (let i = 0; i < 10; i++) {
    Palette.push(
      <div
        key={i}
        className={`bg-zinc-200 cursor-pointer ${styles.colorPalette}`}
        style={
          favoriteColors[i]
            ? {
                backgroundColor: rgbToHex(
                  favoriteColors[i][COLORINFO.rgbR],
                  favoriteColors[i][COLORINFO.rgbG],
                  favoriteColors[i][COLORINFO.rgbB]
                ),
              }
            : {}
        }
        onClick={() => removeColorToPalette(i)}
      ></div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-around w-full bg-zinc-800">
      {Palette}
      {favoriteColors.length > 0 ? <ExportPDF favoriteColors={favoriteColors} /> : <></>}
    </div>
  );
};

export default ColorsPalette;
