import { Poppins } from "next/font/google";
import ChangeBG from "@/components/ChangeBG";
import Drawer from "@/components/Drawer";
import Colors from "@/components/Colors/Colors";
import ColorDetail from "@/components/ColorDetail/ColorDetail";
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
    const [currentColor, setCurrentColor] = useState(null);
    const [widthColors, setWidthColors] = useState('colors-inactive');

    const [detailTransition, setDetailTransition] = useState('test-transition-off');

    useEffect(() => {
        if(currentColor){
            setWidthColors('colors-active');
            setDetailTransition('detail-active');
            console.log(currentColor[34]);
        }else{
            setWidthColors('colors-inactive')
            setDetailTransition('detail-inactive');
            console.log("Color cerrado");
        }
    }
    ),[currentColor];

    return (
        <>
            <main
                className={`flex min-h-screen flex-wrap justify-center items-center p-12 ${poppins.className} custom-bg`}
            >
                <Drawer>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-4xl font-bold text-white text-center">
                            Filtros
                        </h1>
                        <p className="text-white">Lorem</p>
                    </div>
                </Drawer>
                <div className={`flex min-h-screen w-full`}>
                    <div className={`flex flex-wrap justify-center ${widthColors} items-center transition-all`}>
                        <Colors colors={colors} setCurrentColor={setCurrentColor}/>
                    </div>
                    <div className={`flex ${detailTransition} top-0 right-0 h-128 transition ease-in-out delay-150 `}>
                        <ColorDetail color={currentColor} setCurrentColor={setCurrentColor}/>
                    </div>
                </div>
            </main>       
        </>
    );
}
