import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
const PersonalOrbitControls = ({ setControls }) => {
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) return;
    setControls(ref.current);
  }, [ref]);
  return (
    <OrbitControls
      ref={ref}
      keys={{ LEFT: "ArrowLeft", RIGHT: "ArrowRight", UP: "ArrowUp", BOTTOM: "ArrowDown" }}
      enabled={true}
      enableRotate={true}
      enableZoom={true}
      enablePan={true}
      keyEvents={true}
    />
  );
};

export default PersonalOrbitControls;
