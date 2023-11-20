import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import * as THREE from "three";

import PersonalOrbitControls from "./PersonalOrbitControls";
import MapColors3d from "./MapColors3d";

const initialPosition = [100, 100, 250];

const Experience = ({ setControls, setCurrentColor, colors }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <p>loading</p>;

  return (
    <Canvas
      camera={{ position: initialPosition, fov: 50 }}
      gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
      style={{ background: "#f9f9fe", height: "100vh" }}
    >
      <PersonalOrbitControls setControls={setControls} />
      {/* Puntos de Colores */}
      <MapColors3d colors={colors} setCurrentColor={setCurrentColor} />
    </Canvas>
  );
};

export default Experience;
