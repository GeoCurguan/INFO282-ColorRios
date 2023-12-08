import { COLORINFO } from "@/constants/properties";
import { Sphere } from "@react-three/drei";

const MapColors3d = ({ colors, setCurrentColor }) => {
  return (
    <>
      {colors.map((color, index) => {
        const rgb = [color[COLORINFO.rgbR], color[COLORINFO.rgbG], color[COLORINFO.rgbB]];
        console.log(color);
        if (rgb[0] === "" || rgb[0] === null || rgb[1] === "" || rgb[1] === null || rgb[2] === "" || rgb[2] === null)
          return null;
        if (color[COLORINFO.cielabA] === "" || color[COLORINFO.cielabB] === "" || color[COLORINFO.cielabL] === "")
          return null;

        const x = Number(color[COLORINFO.cielabA]);
        const y = Number(color[COLORINFO.cielabB]);
        const z = Number(color[COLORINFO.cielabL]);

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
