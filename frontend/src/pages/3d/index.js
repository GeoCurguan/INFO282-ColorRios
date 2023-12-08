import { useState, useEffect } from "react";
import Experience from "@/components/3d/Experience";
import CardInfo from "@/components/3d/CardInfo";
import MouseTip from "@/components/3d/MouseTip";
import Nav from "@/components/Navbar/Nav";
import ColorDetail from "@/components/ColorDetail/ColorDetail";

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IP}/api/getColors`);
  const colors = await res.json();
  // const values = colors.values;

  return {
    props: {
      colors: colors.colors,
    },
  };
}
const Home = ({ colors }) => {
  const [currentColor, setCurrentColor] = useState(null);
  const [controls, setControls] = useState();
  useEffect(() => {
    console.log("controls", controls);
    if (!controls) return;
  }, [controls]);

  const handleReset = () => {
    controls.reset();
  };

  return (
    <>
      <Nav />
      <div className="flex h-[calc(100vh-80px)] flex-wrap justify-center items-center">
        <Experience setControls={setControls} setCurrentColor={setCurrentColor} colors={colors} />
        {/* <ColorDetail color={currentColor} setCurrentColor={setCurrentColor} /> */}
        <CardInfo currentColor={currentColor} />
        <MouseTip handleReset={handleReset} />
      </div>
    </>
  );
};

export default Home;
