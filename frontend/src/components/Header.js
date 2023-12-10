import React from "react";
import ColorsPalette from "./ColorsPalette/ColorsPalette";

const Header = ({ filteredColorsLength, colorsLength, colorToPalette, setCurrentColor}) => {
    return (
        <header className="flex flex-col items-center justify-center w-full mb-8">
            <ColorsPalette colorToPalette={colorToPalette} setCurrentColor={setCurrentColor}/>
            <h1 className="text-4xl font-bold text-white mt-8">
                Los Ríos en Colores
            </h1>
            <p className="text-white">
                {filteredColorsLength} de {colorsLength} colores
            </p>
        </header>
    );
};

export default Header;
