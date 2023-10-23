import React from "react";

const Header = ({ filteredColorsLength, colorsLength }) => {
  return (
    <header className="flex flex-col items-center justify-center w-full mb-8">
      <h1 className="text-4xl font-bold text-white">Los Ríos en Colores</h1>
      <p className="text-white">
        {filteredColorsLength} de {colorsLength} colores
      </p>
    </header>
  );
};

export default Header;
