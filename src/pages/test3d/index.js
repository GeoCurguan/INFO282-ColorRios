import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

const Home = () => {
  return (
    <div className={`flex min-h-screen flex-wrap justify-center items-center`}>
      <Canvas
        gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
        linear
        camera={{ position: [40, 25, -40], fov: 40 }}
      >
        <Sphere args={[5, 10, 10]}>
          {/* same color as above */}
          <meshBasicMaterial attach="material" color={"red"} />
        </Sphere>
        <Sphere args={[5, 10, 10]} position={[0, 0, 15]}>
          {/* same color as above */}
          <meshBasicMaterial attach="material" color="rgb(255,0,0)" />
        </Sphere>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Home;
