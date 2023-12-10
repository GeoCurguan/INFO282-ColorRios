import ColorDetail from "../ColorDetail/ColorDetail";
import { useState } from "react";

const PalettesColors = ({ palettesColors }) => {
  const [color, setCurrentColor] = useState(null);
  return (
    <div className="mt-4 flex flex-col items-center justify-center w-full gap-4">
      {palettesColors?.map((palette) => (
        <PalettesColor setCurrentColor={setCurrentColor} palettesColor={palette} key={palette.id} />
      ))}
      {color && <ColorDetail color={color} setCurrentColor={setCurrentColor} />}
    </div>
  );
};

const PalettesColor = ({ setCurrentColor, palettesColor }) => {
  const { nombre_palette } = palettesColor;
  return (
    <div className="mb-6 flex flex-col items-center justify-center gap-1 flex-wrap">
      <h3 className="text-xl font-bold text-[#D9D9D9]">{nombre_palette}</h3>
      <div className="flex flex-row items-center justify-center flex-wrap">
        {palettesColor.colors.map((color, index) => {
          // Redondeamos el primer color
          if (index === 0)
            return (
              <ColorSquare setCurrentColor={setCurrentColor} color={color} key={color.id} className="rounded-l-md" />
            );

          // Redondeamos el ultimo color
          if (index === palettesColor.colors.length - 1)
            return (
              <ColorSquare setCurrentColor={setCurrentColor} color={color} key={color.id} className="rounded-r-md" />
            );

          return <ColorSquare setCurrentColor={setCurrentColor} color={color} key={color.id} />;
        })}
      </div>
    </div>
  );
};

const ColorSquare = ({ setCurrentColor, color, className }) => {
  const { R, G, B } = color;
  return (
    <div
      onClick={() => setCurrentColor(color)}
      className={`w-16 h-16 cursor-pointer ${className}`}
      style={{ backgroundColor: `rgb(${R}, ${G}, ${B})` }}
    ></div>
  );
};

export default PalettesColors;
