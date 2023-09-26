import React, { useState } from "react";
import { RGB, COLORINFO } from "@/constants/properties";
import { colorRGB } from "@/utils";
import styles from "./styles/ColorDetail.module.css";

const ColorDetail = ({ color, setCurrentColor }) => {
  const handleCloseDetail = () => {
    setCurrentColor(null);
  };

  // ¿No hay color seleccionado? No se muestra nada
  if (!color) return null;

  const styleBG = colorRGB(color[RGB.R], color[RGB.G], color[RGB.B]);
  return (
    <>
      <div
        className={`align-center relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-400 ${styles.ColorDetail}`}
        style={styleBG}
      >
        <div className="absolute inset-0 bg-[url(/img/grid.svg)] bg-center mask-image-linear-gradient"></div>

        <div className="h-full w-full max-w-sm bg-gray-50 p-5">
          <p className="pb-2 text-center text-3xl font-extrabold" style={{ color: { styleBG } }}>
            {color[COLORINFO.objeto]}
          </p>
          <div className="h-32 rounded-xl" style={styleBG}></div>
          <div className="relative">
            <div className="h-32 w-32 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <img
                src="https://codexverde.cl/wp-content/uploads/2019/09/Copihue-photo1-compressor.jpg"
                alt="Ejemplo: Copihue"
                //src={color[COLORINFO.imageUrl]}
                //alt={color[COLORINFO.objeto]}
                className="h-32 w-32 rounded-full border-4 border-red-500 object-cover"
              />
            </div>
          </div>
          <div className="justify-left h-16 pb-5"></div>

          <div className="justify-left max-h-64 overflow-y-scroll">
            <p className="py-2 text-center text-xl font-bold">Detalles de la Muestra</p>
            <p>Comuna : {color[COLORINFO.comuna]}</p>
            <p>{color[COLORINFO.description]}</p>
            <p>Códigos del Color</p>
            <p>
              RGB: {color[RGB.R]}, {color[RGB.G]}, {color[RGB.B]}
            </p>
            <p>HEX: {color.hex}</p>
          </div>

          <button className="w-full bg-red-500 text-white font-bold text-lg p-2 rounded-lg hover:bg-red-600 mt-2">
            Añadir a mi paleta
          </button>
        </div>
      </div>
    </>
  );
};

export default ColorDetail;
