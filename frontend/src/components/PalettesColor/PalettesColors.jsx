import React from "react";

const PalettesColors = ({ palettesColors }) => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center w-full h-full gap-4">
      {palettesColors.map((palette) => (
        <PalettesColor palettesColor={palette} key={palette.id} />
      ))}
    </div>
  );
};

const PalettesColor = ({ palettesColor }) => {
  const palette = palettesColor;
  console.log(palette);
  return (
    <div className="mb-6 flex flex-row items-center justify-center gap-1 flex-wrap">
      {palette.colors.map((color) => (
        <ColorSquare color={color} key={color} />
      ))}
    </div>
  );
};

const ColorSquare = ({ color }) => {
  const { R, G, B } = color;
  return <div className="w-16 h-16" style={{ backgroundColor: `rgb(${R}, ${G}, ${B})` }}></div>;
};

export default PalettesColors;
