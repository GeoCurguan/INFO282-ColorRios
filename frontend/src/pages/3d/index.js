import { useState, useEffect } from "react";
import Experience from "@/components/3d/Experience";
import MouseInfo from "@/components/3d/MouseInfo";
import CardInfo from "@/components/3d/CardInfo";
import MouseTip from "@/components/3d/MouseTip";
import Nav from "@/components/Navbar/Nav";

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
  const [controls, setControls] = useState();
  useEffect(() => {
    console.log("controls", controls);
    if (!controls) return;
  }, [controls]);

  return (
    <>
      <Nav />
      <div className="flex min-h-screen flex-wrap justify-center items-center">
        <button
          onClick={() => {
            controls.reset();
          }}
        >
          Reset
        </button>
        <Experience setControls={setControls} setCurrentColor={setCurrentColor} colors={colors} />
        <MouseInfo />
        <CardInfo currentColor={currentColor} />
        <MouseTip />
      </div>
    </>
  );
};

export default Home;
