import { useState, useEffect} from "react";
import styles from "./styles/ColorsPalette.module.css";
import { RGB, COLORINFO } from "@/constants/properties";
import { colorRGB,rgbToHex } from "@/utils";

import ColorPDF from "../ColorPDF/ColorPDF";

const ColorsPalette = ({colorToPalette}) => {
    const [favoriteColors, setFavoriteColors] = useState([]);

    function removeColorToPalette(colorIdx){
        console.log(colorIdx)
        setFavoriteColors(prevColors => prevColors.filter((_, index) => index !== colorIdx));
    }

    function exportColor(){

    }

    useEffect(() => {
        if (colorToPalette && !favoriteColors.includes(colorToPalette)) {
          setFavoriteColors(prevColors => [...prevColors, colorToPalette]);
        }
      }, [colorToPalette]);

    const Palette = [];
    for (let i = 0; i < 10; i++) {
        Palette.push(
            <div
                key={i}
                className={`bg-zinc-200 cursor-pointer ${styles.colorPalette}`}
                style={favoriteColors[i] ? {backgroundColor: rgbToHex(favoriteColors[i][RGB.R], favoriteColors[i][RGB.G], favoriteColors[i][RGB.B]) } : {}}
                onClick={() => removeColorToPalette(i)}
            ></div>
        );
    }

    return(
        <div className="flex flex-row items-center justify-around w-full bg-zinc-800">
            {Palette}
            <buton className={`cursor-pointer ${styles.exportButton}`}onClick={() => exportColor()}>Exportar</buton>
        </div>
    );
}

export default ColorsPalette;