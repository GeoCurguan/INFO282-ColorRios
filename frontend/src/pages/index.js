// Hooks
import { useState } from "react";
import useSideBar from "@/hooks/useSideBar";
import useFilters from "@/hooks/useFilters";

// Components
import Header from "@/components/Header";
import Drawer from "@/components/Drawer/Drawer";
import Colors from "@/components/Colors/Colors";
import ColorDetail from "@/components/ColorDetail/ColorDetail";
import Nav from "@/components/Navbar/Nav";

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IP}/api/getColors`);
  const colors = await res.json();
  // const values = colors.values;

  return {
    props: {
      colors: colors.colors || [],
    },
  };
}

export default function Home({ colors }) {
  const { classNameObject, openFilters, toggleFilters, widthColors, currentColor, setCurrentColor } = useSideBar();
  const { filters, filterColors, setFilters } = useFilters();
  const filteredColors = filterColors(colors);
  const [colorToPalette, setColorToPalette] = useState(null);

  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-wrap justify-center items-center p-12 custom-bg">
        <div className={`flex min-h-screen w-full`}>
          {/* -- ColorDetail -- */}
          <div
            className={`flex ${classNameObject.filtersDrawer.detailTransition} top-0 right-0 h-128 transition ease-in-out delay-150 `}
          >
            <Drawer
              colors={colors}
              openFilters={openFilters}
              toggleFilters={toggleFilters}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div
            className={`flex flex-wrap justify-center ${widthColors} items-center transition-all content-start `}
            data-testid="colors"
          >
            <Header
              filteredColorsLength={filteredColors.length}
              colorsLength={colors.length}
              colorToPalette={colorToPalette}
              setCurrentColor={setCurrentColor}
            />
            <Colors colors={filteredColors} setCurrentColor={setCurrentColor} />
          </div>

          {/* -- ColorDetail -- */}
          <div
            className={`flex ${classNameObject.colorDetail.detailTransition} top-0 right-0 h-128 transition ease-in-out delay-150 `}
          >
            <ColorDetail color={currentColor} setCurrentColor={setCurrentColor} setColorToPalette={setColorToPalette} />
          </div>
        </div>
      </main>
    </>
  );
}
