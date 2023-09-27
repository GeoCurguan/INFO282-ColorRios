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

    //Estilo para el título (cambia el color del texto según la selección)
    const titleStyle = {
        color: colorRGB(color?.[RGB.R], color?.[RGB.G], color?.[RGB.B])
            .backgroundColor,
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
                title.style.fontSize = `${fontSize + 6}px`;
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
                        className={`h-full w-full max-w-xl bg-gray-50 p-5 ${
                            isDrawerOpen ? "" : ""
                        }`}
                    >
                        <div className="flex justify-end p-2">
                            <CloseIcon
                                className="w-8 h-8"
                                onClick={toggleDrawer}
                            ></CloseIcon>
                        </div>
                        <p
                            id="colorTitle"
                            className="pb-2 text-center font-extrabold"
                            style={titleStyle}
                        >
                            {color[COLORINFO.objeto]}
                        </p>

                        <div className="h-32 rounded-xl" style={styleBG}></div>
                        <div className="relative">
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                                <img
                                    src="https://codexverde.cl/wp-content/uploads/2019/09/Copihue-photo1-compressor.jpg"
                                    alt={color[COLORINFO.objeto]}
                                    className="h-32 w-32 rounded-full object-cover"
                                    style={{
                                        border: `4px solid ${titleStyle.color}`,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="justify-left h-16 pb-5"></div>

                        <div className="justify-left max-h-64 overflow-y-scroll">
                            <p className="py-2 text-center text-xl font-bold">
                                Detalles de la Muestra
                            </p>
                            <p>Comuna : {color[COLORINFO.comuna]}</p>
                            <p>{color[COLORINFO.description]}</p>
                            <p>Códigos del Color</p>
                            <p>
                                RGB: {color[RGB.R]}, {color[RGB.G]},{" "}
                                {color[RGB.B]}
                            </p>
                            <p>HEX: {color.hex}</p>
                        </div>

                        <button
                            className="w-full text-white font-bold text-lg p-2 rounded-lg mt-2"
                            style={{ backgroundColor: titleStyle.color }}
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
