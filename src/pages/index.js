import { Poppins } from "next/font/google";
import ChangeBG from "@/pages/components/ChangeBG";
import Drawer from "@/pages/components/Drawer";
import Colors from "@/pages/components/Colors/Colors";
import bd_rios from "@/pages/api/bd-rios.json";

const poppins = Poppins({
    weight: ["200", "300", "400", "500", "700"],
    subsets: ["latin-ext"],
});

export default function Home() {
    const colors = bd_rios.values || [];

    return (
        <main
            className={`flex min-h-screen flex-wrap justify-center items-center p-12 ${poppins.className}`}
        >
            <Drawer>
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold text-white text-center">
                        Filtros
                    </h1>
                    <p className="text-white">Lorem</p>
                </div>
            </Drawer>
            <ChangeBG />
            <Colors colors={colors} />
        </main>
    );
}
