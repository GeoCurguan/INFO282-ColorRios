import React, { useState, useEffect } from "react";
import { HeartIcon, InformationIcon, CloseIcon } from "@/icons";
import { RGB, COLORINFO } from "@/constants/properties";
import { colorRGB, rgbToHex } from "@/utils";
import styles from "./styles/ColorDetail.module.css";
import Image from "next/image";

const ColorDetail = ({ color, setCurrentColor, setColorToPalette }) => {
  //Estados de la barra
  function name(color) {
    if (color[COLORINFO.colorName]) {
      return <h1 className="truncate text-center text-3xl font-bold">{color[COLORINFO.colorName]}</h1>;
    } else {
      return <h1 className="truncate text-gray-300 text-center text-3xl font-bold">Sin Nombre</h1>;
    }
  }

  function category(color) {
    if (["roca", "suelo", "planta"].includes(color[COLORINFO.category].toLowerCase())) {
      return (
        <div>
          <p className="text-sm font-bold">Objeto:</p>
          <p className="text-sm">&nbsp;&nbsp;&nbsp;{color[COLORINFO.category]}</p>
        </div>
      );
    } else if (["agua", "cielo", "vegetal"].includes(color[COLORINFO.category].toLowerCase())) {
      return (
        <div>
          <p className="text-sm font-bold">Atmosfera:</p>
          <p className="text-sm">&nbsp;&nbsp;&nbsp;{color[COLORINFO.category]}</p>
        </div>
      );
    }
  }

  function comuna(color) {
    if (color[COLORINFO.comuna]) {
      return (
        <div>
          <p className="text-sm font-bold">Comuna:</p>
          <p className="text-sm">&nbsp;&nbsp;&nbsp;{color[COLORINFO.comuna]}</p>
        </div>
      );
    }
  }

  function season(color) {
    if (color[COLORINFO.season]) {
      return (
        <div>
          <p className="text-sm font-bold">Estación:</p>
          <p className="text-sm">&nbsp;&nbsp;&nbsp;{color[COLORINFO.season]}</p>
        </div>
      );
    }
  }

  function sample(color) {
    if (color[COLORINFO.colorName]) {
      return (
        <div>
          <p className="text-sm font-bold">Muestra:</p>
          <p className="text-sm">&nbsp;&nbsp;&nbsp;{color[COLORINFO.colorName]}</p>
        </div>
      );
    }
  }

  function image(color) {
    if (color[COLORINFO.image]) {
      return (
        <div className="my-1/4 mx-auto h-32 w-32">
          <img
            src={color[COLORINFO.image]}
            alt={color[COLORINFO.colorName]}
            className="object-cover h-32 w-32 translate-y-1/3 rounded-full border-4 border-blue-700 shadow-xl"
            style={{
              border: `4px solid ${colorStyle.color}`,
            }}
          />
        </div>
      );
    }
  }

  function ncs(color) {
    if (color[COLORINFO.ncsNuance] && color[COLORINFO.ncsHue]) {
      return (
        <div>
          <p className="text-sm font-bold">Natural Color System:</p>
          <p className="text-sm">
            &nbsp;&nbsp;&nbsp;NCS {color[COLORINFO.ncsNuance]}-{color[COLORINFO.ncsHue]}
          </p>
        </div>
      );
    }
  }

  function munsell(color) {
    if (
      color[COLORINFO.munsellPage] &&
      color[COLORINFO.munsellHue] &&
      color[COLORINFO.munsellValue] &&
      color[COLORINFO.munsellChroma] &&
      color[COLORINFO.munsellName]
    ) {
      return (
        <div>
          <p className="text-sm font-bold">Munsell:</p>
          <p className="text-sm">
            &nbsp;&nbsp;&nbsp;{color[COLORINFO.munsellHue]}/ {color[COLORINFO.munsellChroma]}
          </p>
          <p className="text-sm">&nbsp;&nbsp;&nbsp;Nombre: {color[COLORINFO.munsellName]}</p>
        </div>
      );
    }
  }

  function cielab(color) {
    if (color[COLORINFO.cielabL] && color[COLORINFO.cielabA] && color[COLORINFO.cielabB]) {
      return (
        <div>
          <p className="text-sm font-bold">CIELab:</p>
          <p className="text-sm">&nbsp;&nbsp;&nbsp;L*: {color[COLORINFO.cielabL]}</p>
          <p className="text-sm">&nbsp;&nbsp;&nbsp;a*: {color[COLORINFO.cielabA]}</p>
          <p className="text-sm">&nbsp;&nbsp;&nbsp;b*: {color[COLORINFO.cielabB]}</p>
        </div>
      );
    }
  }

  function rgb(color) {
    if (color[COLORINFO.rgbR] && color[COLORINFO.rgbG] && color[COLORINFO.rgbB]) {
      return (
        <div>
          <p className="text-sm font-bold">RGB:</p>
          <p className="text-sm">
            &nbsp;&nbsp;&nbsp;{color[COLORINFO.rgbR]}, {color[COLORINFO.rgbG]}, {color[COLORINFO.rgbB]}
          </p>
        </div>
      );
    }
  }

  function cmyk(color) {
    if (color[COLORINFO.cmykC] && color[COLORINFO.cmykM] && color[COLORINFO.cmykY] && color[COLORINFO.cmykK]) {
      return (
        <div>
          <p className="text-sm font-bold">CMYK:</p>
          <p className="text-sm">
            &nbsp;&nbsp;&nbsp;{color[COLORINFO.cmykC]}C {color[COLORINFO.cmykM]}M {color[COLORINFO.cmykY]}Y{" "}
            {color[COLORINFO.cmykK]}K
          </p>
        </div>
      );
    }
  }

  function ceresita(color) {
    if (color[COLORINFO.ceresitaName]) {
      return (
        <div>
          <p className="text-sm font-bold">Ceresita: {}</p>
          <p className="text-sm">&nbsp;&nbsp;&nbsp;{color[COLORINFO.ceresitaName]}</p>
        </div>
      );
    }
  }

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const styleBG = colorRGB(color?.[COLORINFO.rgbR], color?.[COLORINFO.rgbG], color?.[COLORINFO.rgbB]);

  const getMaxColorValue = (R, G, B) => {
    return Math.max(R, G, B);
  };

  // Asigna el color de fondo y de texto segun el color de la carta cromatica
  let BGColor = "rgb(235, 235, 235)"; // Fondo gris claro
  let FontColor = "rgb(0, 0, 0)"; // Texto negro
  if (getMaxColorValue(color?.[COLORINFO.rgbR], color?.[COLORINFO.rgbG], color?.[COLORINFO.rgbB]) > 230) {
    // En caso de ser muy claro
    BGColor = "rgb(35, 35, 35)"; // Fondo gris oscuro
    FontColor = "rgb(255, 255, 255)"; // Texto blanco
  }

  //Estilo para el título (cambia el color del texto según la selección)
  let colorStyle = {
    color: `rgb(${color?.[COLORINFO.rgbR]},${color?.[COLORINFO.rgbG]},${color?.[COLORINFO.rgbB]})`,
    backgroundColor: `rgb(${color?.[COLORINFO.rgbR]},${color?.[COLORINFO.rgbG]},${color?.[COLORINFO.rgbB]})`,
  };

  const divStyle = {
    backgroundColor: BGColor,
    color: FontColor,
  };

  const buttonStyle = {
    backgroundColor: colorStyle.color,
    color: BGColor,
  };

  const toggleDrawer = () => {
    setCurrentColor(null);
  };

  function addColorToPalette(colorObject) {
    setColorToPalette(colorObject);
  }

  //Función updateFontSize para el título (tamaño) adaptable al espacio que tiene
  useEffect(() => {
    const updateFontSize = () => {
      //buscar el título y guardarlo en 'title'
      const title = document.getElementById("colorTitle");
      if (title) {
        //offsetWidth sirve para medir el espacio disponible (ancho - horizontal)
        const availableWidth = title.offsetWidth;
        //texto que corresponde a objeto de colorinfo
        const text = color[COLORINFO.category];
        //calcular el tamaño de la fuente
        const fontSize = availableWidth / text.length;

        const maxFontSize = 32; // Si fontSize es mayor a 32, se asigna 32
        title.style.fontSize = `${Math.min(fontSize + 6, maxFontSize)}px`;
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
        <div className="z-10 w-[300px] overflow-y-scroll sm:overflow-y-hidden overflow-x-hidden align-center fixed top-0 bottom-0 right-0 flex min-h-screen flex-col overflow-hidden bg-gray-100 shadow-lg justify-between">
          <div className=" w-full bg-gray-300 shadow-md">
            <button className="float-right m-2" onClick={toggleDrawer}>
              <CloseIcon className="w-6 h-6 text-gray-900" />
            </button>

            <div className="m-12 rounded-md shadow-xl" style={colorStyle}>
              {image(color)}
            </div>
          </div>

          <div className="text-gray-900 w-full pl-4 pr-2 flex-1 overflow-y-auto sm:max-h-full sm:pr-0 pt-4">
            <div>{name(color)}</div>
            <div className="flex items-center justify-center">
              <div className="rounded mt-4 mb-4" style={{backgroundColor: `rgb(${color[COLORINFO.rgbR]},${color[COLORINFO.rgbG]}, ${color[COLORINFO.rgbB]})`, width: '150px', height:'100px'}}>
              </div>
            </div>

            <div className="justify-left flex-1">
              <p className="py-4 text-center text-xl font-semibold">Información</p>
              {category(color)}
              {comuna(color)}
              {season(color)}
              {sample(color)}
              <p className="py-4 text-center text-xl font-semibold">Códigos</p>
              {ncs(color)}
              {munsell(color)}
              {cielab(color)}
              {rgb(color)}
              {cmyk(color)}
              {ceresita(color)}
            </div>
          </div>

          <div className="w-full flex  justify-between p-4">
            <button
              className="flex items-center rounded-md transition-colors duration-300 ease-in-out
               bg-pink-500 px-2 py-2 text-white hover:bg-pink-600"
              onClick={() => addColorToPalette(color)}
            >
              <HeartIcon className="w-6 h-6" fill="white" />
            </button>

            <button className="flex items-center rounded-md transition-colors duration-300 ease-in-out bg-green-500 px-2 py-2 text-white hover:bg-green-600">
              <InformationIcon className="w-6 h-6" fill="white" />
            </button>

            <button className="flex items-center rounded-md transition-colors duration-300 ease-in-out bg-green-500 hover:bg-green-600 px-2 py-2 text-white">
              <InformationIcon className="w-6 h-6" fill="white" />
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
    /*
        <>
          {color ? (
            <div
              className={`align-center relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-400 ${styles.ColorDetail}`}
              data-testid="color-detail"
              style={styleBG}
            >
              <div className={`h-full w-full max-w-xl p-5 ${isDrawerOpen ? "" : ""}`} style={divStyle}>
                <div className="flex justify-end p-2">
                  <CloseIcon className="w-8 h-8" onClick={toggleDrawer} data-testid="color-detail-close"></CloseIcon>
                </div>
                <section className="flex justify-center items-center h-10">
                  {name(color)}
                </section>

                <div className="h-32 rounded-xl" style={styleBG}></div>
                <div className="relative">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform h-32 w-32">
                    {image(color)}
                  </div>
                </div>
                <div className="justify-left h-16 mb-2"></div>

                <div className="justify-left max-h-64 overflow-y-scroll" style={divStyle}>
                  <p className="py-2 text-center text-xl font-bold">Detalles de la Muestra</p>
                  {category(color)}
                  {comuna(color)}
                  {season(color)}
                  {sample(color)}
                  <p className="py-2 text-center text-xl font-bold">Códigos del Color</p>
                  {ncs(color)}
                  {munsell(color)}
                  {cielab(color)}
                  {rgb(color)}
                  {cmyk(color)}
                  {ceresita(color)}
                  <p className="text-sm font-bold">HEX</p>
                  <p className="text-sm">&nbsp;&nbsp;&nbsp;{color.hex}</p>
                </div>

                <button className="w-full text-white font-bold text-lg p-2 rounded-lg mt-4" style={buttonStyle} onClick={() => addColorToPalette(rgbToHex(color[RGB.R], color[RGB.G], color[RGB.B]))}>
                  Añadir a mi paleta
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>*/
  );
};

export default ColorDetail;
