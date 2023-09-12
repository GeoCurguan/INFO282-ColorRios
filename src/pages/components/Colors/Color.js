import { RGB } from "@/pages/constants/properties";
import { colorRGB } from "@/pages/utils";

// color corresponde a un arreglo de 41 elementos
const Color = ({ color }) => {
  const styleBG = colorRGB(color[RGB.R], color[RGB.G], color[RGB.B]);
  return <div className="w-20 h-20" style={styleBG}></div>;
};

export default Color;
