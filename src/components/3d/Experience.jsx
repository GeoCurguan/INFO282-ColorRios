import { COLORINFO } from "@/constants/properties";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";

const Experience = ({ setMousePosition, setCurrentColor, colors }) => {
  // Coords cielab: colors.COLORINFO[cielabL], colors.COLORINFO[cielabA], colors.COLORINFO[cielabB]
  const controls = useRef(null);
  useEffect(() => {
    controls.current.target.set(127, 127, 127);
    controls.current.update();
  }, []);
  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls
        ref={controls}
        keys={{ LEFT: "ArrowLeft", RIGHT: "ArrowRight", UP: "ArrowUp", BOTTOM: "ArrowDown" }}
        enabled={true}
        enableRotate={true}
        enableZoom={true}
        enablePan={true}
      />

      {/* Colores */}
      {colors.map((color, index) => {
        const rgb = [color[COLORINFO.rgbR], color[COLORINFO.rgbG], color[COLORINFO.rgbB]];
        if (rgb[0] === "" || rgb[1] === "" || rgb[2] === "") return null;
        if (color[COLORINFO.cielabA] === "" || color[COLORINFO.cielabB] === "" || color[COLORINFO.cielabL] === "")
          return null;

        const x = Number(color[COLORINFO.cielabA]);
        const y = Number(color[COLORINFO.cielabB]);
        const z = Number(color[COLORINFO.cielabL]);
        return (
          <mesh key={index} position={[x, y, z]} onClick={() => setCurrentColor(color)}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial color={`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`} />
          </mesh>
        );
      })}

      {/* Ejes */}
      <EjesLimites />
    </>
  );
};

const EjesLimites = () => {
  // L: 0, 100
  // A: -128, 127
  // B: -128, 127
  const limitColors = [
    // Todas las combinaciones de los limites
    { x: 0, y: -128, z: -128 },
    { x: 0, y: -128, z: 127 },
    { x: 0, y: 127, z: -128 },
    { x: 0, y: 127, z: 127 },
    { x: 100, y: -128, z: -128 },
    { x: 100, y: -128, z: 127 },
    { x: 100, y: 127, z: -128 },
    { x: 100, y: 127, z: 127 },
  ];

  return (
    <>
      {limitColors.map((color, index) => {
        return (
          <mesh onClick={(e) => console.log(e.object.position)} key={index} position={[color.x, color.y, color.z]}>
            <sphereGeometry args={[4, 32, 32]} />
            <meshStandardMaterial color="red" />
          </mesh>
        );
      })}
    </>
  );
};

export default Experience;
