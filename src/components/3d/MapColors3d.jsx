import { COLORINFO } from "@/constants/properties";
import { Sphere } from "@react-three/drei";

const MapColors3d = ({ colors, setCurrentColor }) => {
  return (
    <>
      {colors.map((color, index) => {
        const rgb = [color[COLORINFO.rgbR], color[COLORINFO.rgbG], color[COLORINFO.rgbB]];
        if (rgb[0] === "" || rgb[1] === "" || rgb[2] === "") return null;
        if (color[COLORINFO.cielabA] === "" || color[COLORINFO.cielabB] === "" || color[COLORINFO.cielabL] === "")
          return null;

        const x = Number(color[COLORINFO.cielabA].trim().replace(",", "."));
        const y = Number(color[COLORINFO.cielabB].trim().replace(",", "."));
        const z = Number(color[COLORINFO.cielabL].trim().replace(",", "."));

        const _color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

        return (
          <mesh key={index} position={[x, y, z]} onClick={() => setCurrentColor(color)}>
            <Sphere args={[2, 32, 32]}>
              <meshBasicMaterial color={_color} />
            </Sphere>
          </mesh>
        );
      })}
    </>
  );
};

export default MapColors3d;
