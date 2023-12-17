import { useState, useEffect } from "react";
import Experience from "@/components/3d/Experience";
import CardInfo from "@/components/3d/CardInfo";
import MouseTip from "@/components/3d/MouseTip";
import Nav from "@/components/Navbar/Nav";
import { COLORINFO } from "@/constants/properties";

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IP}/api/getColors`);
  const colors = await res.json();

  return {
    props: {
      colors: colors.colors || [],
    },
  };
}
const Home = ({ colors }) => {
  const [currentColor, setCurrentColor] = useState(null);
  const [controls, setControls] = useState();

  const filter3dColors = (colors) => {
    return colors.filter((color) => {
      const rgb = [color[COLORINFO.rgbR], color[COLORINFO.rgbG], color[COLORINFO.rgbB]];
      if (rgb[0] === "" || rgb[0] === null || rgb[1] === "" || rgb[1] === null || rgb[2] === "" || rgb[2] === null)
        return null;
      if (color[COLORINFO.cielabA] === "" || color[COLORINFO.cielabB] === "" || color[COLORINFO.cielabL] === "")
        return null;
      return color;
    });
  };

  useEffect(() => {
    if (!controls) return;
  }, [controls]);

  const handleReset = () => {
    controls.reset();
  };

  return (
    <>
      <Nav />
      <div className="flex h-[calc(100vh-80px)] flex-wrap justify-center items-center">
        <Experience setControls={setControls} setCurrentColor={setCurrentColor} colors={filter3dColors(colors)} />
        {/* <ColorDetail color={currentColor} setCurrentColor={setCurrentColor} /> */}
        <CardInfo currentColor={currentColor} />
        <MouseTip handleReset={handleReset} />
      </div>
    </>
  );
};

export default Home;
