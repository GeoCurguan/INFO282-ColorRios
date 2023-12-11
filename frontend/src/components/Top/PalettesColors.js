// Cree otro pq ya envié mal el formato
import { COLORINFO } from "@/constants/properties";

const PalettesColors = ({ palette, setSelectedColor }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-wrap justify-center items-center">
        {palette.paletteColors.map((color, index) => {
          if (index === 0) {
            return (
              <div
                onClick={() => setSelectedColor(color.color)}
                key={color.id}
                className="w-16 h-16 shadow-lg cursor-pointer rounded-l-md"
                style={{
                  backgroundColor: `rgb(${color.color[COLORINFO.rgbR]}, ${color.color[COLORINFO.rgbG]}, ${
                    color.color[COLORINFO.rgbB]
                  })`,
                }}
              ></div>
            );
          }

          if (index === palette.paletteColors.length - 1) {
            return (
              <div
                onClick={() => setSelectedColor(color.color)}
                key={color.id}
                className="w-16 h-16 shadow-lg cursor-pointer rounded-r-md"
                style={{
                  backgroundColor: `rgb(${color.color[COLORINFO.rgbR]}, ${color.color[COLORINFO.rgbG]}, ${
                    color.color[COLORINFO.rgbB]
                  })`,
                }}
              ></div>
            );
          }

          return (
            <div
              onClick={() => setSelectedColor(color.color)}
              key={color.id}
              className="w-16 h-16 shadow-lg cursor-pointer"
              style={{
                backgroundColor: `rgb(${color.color[COLORINFO.rgbR]}, ${color.color[COLORINFO.rgbG]}, ${
                  color.color[COLORINFO.rgbB]
                })`,
              }}
            ></div>
          );
        })}
        {/* Profile */}
        <p className="ml-2 text-2xl text-gray-200 font-bold flex justify-center items-center">
          {palette.nombre_propietario}
        </p>
      </div>
    </div>
  );
};

export default PalettesColors;
