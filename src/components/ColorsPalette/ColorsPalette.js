import { useState, useEffect } from "react";
import styles from "./styles/ColorsPalette.module.css"; // Asegúrate de importar tus estilos
import { RGB } from "@/constants/properties";
import { rgbToHex } from "@/utils";

import ExportPDF from "../ExportPDF/ExportPDF";

const ColorsPalette = ({ colorToPalette }) => {
  const [favoriteColors, setFavoriteColors] = useState([]);
  const [isSticky, setIsSticky] = useState(false);

  function removeColorToPalette(colorIdx) {
    setFavoriteColors((prevColors) =>
      prevColors.filter((_, index) => index !== colorIdx)
    );
  }

  useEffect(() => {
    console.log(colorToPalette);
    if (colorToPalette && !favoriteColors.includes(colorToPalette)) {
      setFavoriteColors((prevColors) => [...prevColors, colorToPalette]);
    }
  }, [colorToPalette]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 132);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
                  favoriteColors[i][RGB.R],
                  favoriteColors[i][RGB.G],
                  favoriteColors[i][RGB.B]
                ),
              }
            : {}
        }
        onClick={() => removeColorToPalette(i)}
      ></div>
    );
  }

  return (
    <div
      className={`flex flex-row items-center justify-around w-full bg-zinc-800 ${
        isSticky ? styles.sticky : ""
      }`}
    >
      {Palette}
      {favoriteColors.length > 0 ? <ExportPDF favoriteColors={favoriteColors} /> : <></>}
    </div>
  );
};

export default ColorsPalette;








