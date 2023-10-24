import { useState, useEffect} from "react";
import styles from "./styles/ColorsPalette.module.css";

const ColorsPalette = ({colorToPalette}) => {
    const [favoriteColors, setFavoriteColors] = useState([]);

    useEffect(() => {
        if (colorToPalette) {
          setFavoriteColors(prevColors => [...prevColors, colorToPalette]);
        }
      }, [colorToPalette]);

    const Palette = [];
    for (let i = 0; i < 9; i++) {
        Palette.push(
            <div
                key={i}
                className={`bg-zinc-200 cursor-pointer ${styles.colorPalette}`}
                style={favoriteColors[i] ? { backgroundColor: favoriteColors[i]} : {}}
            ></div>
        );
    }

    return(
        <div className="flex flex-row items-center justify-around w-full p-4 bg-zinc-800">
            {Palette}
        </div>
    );
}

export default ColorsPalette;