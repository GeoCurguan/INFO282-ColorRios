import { Poppins } from "next/font/google";
import ChangeBG from "@/components/ChangeBG";
import Drawer from "@/components/Drawer";
import Colors from "@/components/Colors/Colors";
import { useState, useEffect } from "react";

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
  return (
    <main className={`flex min-h-screen flex-wrap justify-center items-center p-12 ${poppins.className}`}>
      <Drawer>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center">Filtros</h1>
          <p className="text-white">Lorem</p>
        </div>
      </Drawer>
      <ChangeBG />
      <Colors colors={colors} />
    </main>
  );
}
