import { Poppins } from "next/font/google";
import ChangeBG from "./components/ChangeBG";
import Drawer from "./components/Drawer";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "700"],
  subsets: ["latin-ext"],
});

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-12 ${poppins.className}`}
    >
      <Drawer>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center">Filtros</h1>
          <p className="text-white">This is a Next.js boilerplate</p>
        </div>
      </Drawer>
      <ChangeBG />
    </main>
  );
}
