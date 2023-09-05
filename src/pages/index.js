import { Poppins } from "next/font/google";
import ChangeBG from "./components/ChangeBG";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "700"],
  subsets: ["latin-ext"],
});

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-12 ${poppins.className}`}
    >
      <ChangeBG />
    </main>
  );
}
