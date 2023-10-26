import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Poppins } from "next/font/google";
import Experience from "@/components/3d/Experience";
import MouseInfo from "@/components/3d/MouseInfo";
import CardInfo from "@/components/3d/CardInfo";
import MouseTip from "@/components/3d/MouseTip";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "700"],
  subsets: ["latin-ext"],
});

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IP}/api/colors`);
  const colors = await res.json();
  const values = colors.values;

  return {
    props: {
      colors: values,
    },
  };
}

const Home = ({ colors }) => {
  const [currentColor, setCurrentColor] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, z: 0 });

  return (
    <div className={`flex min-h-screen flex-wrap justify-center items-center ${poppins.className}`}>
      <Canvas style={{ height: "100vh" }}>
        <Experience setMousePosition={setMousePosition} setCurrentColor={setCurrentColor} colors={colors} />
      </Canvas>
      <MouseInfo />
      <CardInfo currentColor={currentColor} />
      <MouseTip />
    </div>
  );
};

export default Home;
