import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import * as THREE from "three";

import PersonalOrbitControls from "./PersonalOrbitControls";
import MapColors3d from "./MapColors3d";

const Experience = ({ setControls, setCurrentColor, colors }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <p>loading</p>;

  return (
    <Canvas
      camera={{ position: [127, 127, 127], fov: 45 }}
      gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
      style={{ background: "#f9f9fe", height: "100vh" }}
    >
      <PersonalOrbitControls setControls={setControls} />
      {/* Puntos de Colores */}
      <MapColors3d colors={colors} setCurrentColor={setCurrentColor} />
      {/* Ejes */}
      <EjesLimites />
    </Canvas>
  );
};

const EjesLimites = () => {
  // L: 0, 100
  // A: -128, 127
  // B: -128, 127
  const minLightness = 0;
  const maxLightness = 100;
  const minA = -128;
  const maxA = 127;
  const limitColors = [
    { x: minA, y: minA, z: minLightness },
    { x: maxA, y: minA, z: minLightness },
    { x: minA, y: maxA, z: minLightness },
    { x: maxA, y: maxA, z: minLightness },
    { x: minA, y: minA, z: maxLightness },
    { x: maxA, y: minA, z: maxLightness },
    { x: minA, y: maxA, z: maxLightness },
    { x: maxA, y: maxA, z: maxLightness },
  ];

  return (
    <>
      {limitColors.map((color, index) => {
        return (
          <mesh onClick={(e) => console.log(e.object.position)} key={index} position={[color.x, color.y, color.z]}>
            <sphereGeometry args={[4, 32, 32]} />
            <meshBasicMaterial color={"#ff0000"} wireframe={true} />
          </mesh>
        );
      })}
    </>
  );
};

export default Experience;
