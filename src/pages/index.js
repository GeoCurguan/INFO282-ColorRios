import { Poppins } from "next/font/google";
// Hooks
import { useState, useEffect } from "react";
import useSideBar from "@/hooks/useSideBar";
import useFilters from "@/hooks/useFilters";
// Components
import Drawer from "@/components/Drawer/Drawer";
import Colors from "@/components/Colors/Colors";
import ColorDetail from "@/components/ColorDetail/ColorDetail";

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

export default function Home({ colors }) {
  const { classNameObject, openFilters, toggleFilters, widthColors, detailTransition, currentColor, setCurrentColor } =
    useSideBar();
  const { filters, filterColors, setFilters } = useFilters();
  const filteredColors = filterColors(colors);

  return (
    <>
      <main className={`flex min-h-screen flex-wrap justify-center items-center p-12 ${poppins.className} custom-bg`}>
        <div className={`flex min-h-screen w-full`}>
          {/* -- ColorDetail -- */}
          <div
            className={`flex ${classNameObject.filtersDrawer.detailTransition} top-0 right-0 h-128 transition ease-in-out delay-150 `}
          >
            <Drawer openFilters={openFilters} toggleFilters={toggleFilters} filters={filters} setFilters={setFilters} />
          </div>
          <div
            className={`flex flex-wrap justify-center ${widthColors} items-center transition-all content-start `}
            data-testid="colors"
          >
            <Colors colors={filteredColors} setCurrentColor={setCurrentColor} />
          </div>

          {/* -- ColorDetail -- */}
          <div
            className={`flex ${classNameObject.colorDetail.detailTransition} top-0 right-0 h-128 transition ease-in-out delay-150 `}
          >
            <ColorDetail color={currentColor} setCurrentColor={setCurrentColor} />
          </div>
        </div>
      </main>
    </>
  );
}
