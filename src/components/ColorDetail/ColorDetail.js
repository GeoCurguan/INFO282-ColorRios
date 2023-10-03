import React, { useState, useEffect } from "react";
import { RGB, COLORINFO } from "@/constants/properties";
import { colorRGB } from "@/utils";
import styles from "./styles/ColorDetail.module.css";
import { CloseIcon } from "@/icons";

const ColorDetail = ({ color, setCurrentColor }) => {
    const handleCloseDetail = () => {
        setCurrentColor(null);
    };

    //Estados de la barra
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const styleBG = colorRGB(color?.[RGB.R], color?.[RGB.G], color?.[RGB.B]);

    const getMaxColorValue = (R, G, B) => {
        console.log("El valor mayor es:", Math.max(R, G, B));
        return Math.max(R, G, B);
    };

    // Asigna el color de fondo y de texto segun el color de la carta cromatica
    let BGColor = "rgb(235, 235, 235)"; // Fondo gris claro
    let FontColor = "rgb(0, 0, 0)"; // Texto negro
    if (
        getMaxColorValue(color?.[RGB.R], color?.[RGB.G], color?.[RGB.B]) > 230
    ) {
        // En caso de ser muy claro
        BGColor = "rgb(35, 35, 35)"; // Fondo gris oscuro
        FontColor = "rgb(255, 255, 255)"; // Texto blanco
    }

    //Estilo para el título (cambia el color del texto según la selección)
    const titleStyle = {
        color: colorRGB(color?.[RGB.R], color?.[RGB.G], color?.[RGB.B])
            .backgroundColor,
    };

    const divStyle = {
        backgroundColor: BGColor,
        color: FontColor,
    };

    const buttonStyle = {
        backgroundColor: titleStyle.color,
        color: BGColor,
    };

    const toggleDrawer = () => {
        setCurrentColor(null);
    };

    //Función updateFontSize para el título (tamaño) adaptable al espacio que tiene
    useEffect(() => {
        const updateFontSize = () => {
            //buscar el título y guardarlo en 'title'
            const title = document.getElementById("colorTitle");
            if (title) {
                //offsetWidth sirve para medir el espacio disponible (ancho - horizontal)
                const availableWidth = title.offsetWidth;
                //texto que corresponde a objeto de colorinfo
                const text = color[COLORINFO.objeto];
                //calcular el tamaño de la fuente
                const fontSize = availableWidth / text.length;

                const maxFontSize = 32; // Si fontSize es mayor a 32, se asigna 32
                title.style.fontSize = `${Math.min(
                    fontSize + 6,
                    maxFontSize
                )}px`;
            }
        };

        // Redimensionar la ventana cuando cambie de tamaño
        window.addEventListener("resize", updateFontSize);
        updateFontSize();

        return () => {
            window.removeEventListener("resize", updateFontSize);
        };
    }, [color]);

    return (
        <>
            {color ? (
                <div
                    className={`align-center relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-400 ${styles.ColorDetail}`}
                    style={styleBG}
                >
                    <div
                        className={`h-full w-full max-w-xl p-5 ${
                            isDrawerOpen ? "" : ""
                        }`}
                        style={divStyle}
                    >
                        <div className="flex justify-end p-2">
                            <CloseIcon
                                className="w-8 h-8"
                                onClick={toggleDrawer}
                            ></CloseIcon>
                        </div>
                        <section className="flex justify-center items-center h-10">
                            <h2
                                id="colorTitle"
                                className="w-full leading-none text-center font-extrabold"
                                style={titleStyle}
                            >
                                {color[COLORINFO.objeto]}
                            </h2>
                        </section>

                        <div className="h-32 rounded-xl" style={styleBG}></div>
                        <div className="relative">
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                                <img
                                    src={color[COLORINFO.imageUrl]}
                                    alt={color[COLORINFO.objeto]}
                                    className="h-32 w-32 object-cover"
                                    style={{
                                        borderRadius: "50%",
                                        border: `4px solid ${titleStyle.color}`,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="justify-left h-16 pb-5"></div>

                        <div
                            className="justify-left max-h-64 overflow-y-scroll"
                            style={divStyle}
                        >
                            <p className="py-2 text-center text-xl font-bold">
                                Detalles de la Muestra
                            </p>
                            <p className="text-sm font-bold">
                                Objeto/Atmosfera
                            </p>
                            <p className="text-sm">
                                &nbsp;&nbsp;&nbsp;{color[COLORINFO.objeto]}
                            </p>
                            <p className="text-sm font-bold">Muestra</p>
                            <p className="text-sm">
                                &nbsp;&nbsp;&nbsp;Placeholder
                            </p>
                            <p className="text-sm font-bold">Comuna</p>
                            <p className="text-sm">
                                &nbsp;&nbsp;&nbsp;{color[COLORINFO.comuna]}
                            </p>
                            <p className="text-sm font-bold">Expedición</p>
                            <p className="text-sm ">
                                &nbsp;&nbsp;&nbsp;{color[COLORINFO.description]}
                            </p>
                            <p className="text-sm font-bold">Estación:</p>
                            <p className="text-sm">
                                &nbsp;&nbsp;&nbsp;Placeholder
                            </p>

                            <p className="py-2 text-center text-xl font-bold">
                                Códigos del Color
                            </p>
                            <p className="text-sm font-bold">RGB</p>
                            <p className="text-sm">
                                &nbsp;&nbsp;&nbsp;{color[RGB.R]}, {color[RGB.G]}
                                , {color[RGB.B]}
                            </p>
                            <p className="text-sm font-bold">HEX</p>
                            <p className="text-sm">
                                &nbsp;&nbsp;&nbsp;{color.hex}
                            </p>
                            <p className="text-sm font-bold">NCS: {}</p>
                            <p className="text-sm">
                                &nbsp;&nbsp;&nbsp;Placeholder
                            </p>
                            <p className="text-sm font-bold">CMYK: {}</p>
                            <p className="text-sm">
                                &nbsp;&nbsp;&nbsp;Placeholder
                            </p>
                            <p className="text-sm font-bold">Ceresita: {}</p>
                            <p className="text-sm">
                                &nbsp;&nbsp;&nbsp;Placeholder
                            </p>
                            <p className="text-sm font-bold">Pantone: {}</p>
                            <p className="text-sm">
                                &nbsp;&nbsp;&nbsp;Placeholder
                            </p>
                        </div>

                        <button
                            className="w-full text-white font-bold text-lg p-2 rounded-lg mt-2"
                            style={buttonStyle}
                        >
                            Añadir a mi paleta
                        </button>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default ColorDetail;
