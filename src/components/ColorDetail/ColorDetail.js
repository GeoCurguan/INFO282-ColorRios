import React, { useState, useEffect } from "react";
import { RGB, COLORINFO } from "@/constants/properties";
import { colorRGB, rgbToHex } from "@/utils";
import styles from "./styles/ColorDetail.module.css";
import { CloseIcon } from "@/icons";
import Image from "next/image";


const ColorDetail = ({ color, setCurrentColor, setColorToPalette }) => {
  //Estados de la barra

  function name(color) {
    if (color[COLORINFO.colorName]) {
      return <h1 class="mt-4 truncate text-center text-3xl font-bold">
        {color[COLORINFO.colorName]}
      </h1>
    }
    else {
      return <h1 class="mt-4 truncate text-gray-300 text-center text-3xl font-bold">
        Sin Nombre
      </h1>
    }
  }

  function category(color) {
    if (["roca", "suelo", "vegetal"].includes(color[COLORINFO.category].toLowerCase())) {
      return <div>
        <p className="text-sm font-bold">Objeto:</p>
        <p className="text-sm">&nbsp;&nbsp;&nbsp;{color[COLORINFO.category]}</p>
      </div>
    }
    else if (["agua", "cielo", "vegetacion"].includes(color[COLORINFO.category].toLowerCase())) {
      return <div>
        <p className="text-sm font-bold">Atmosfera:</p>
        <p className="text-sm">&nbsp;&nbsp;&nbsp;{color[COLORINFO.category]}</p>
      </div>
    }
  }

  function comuna(color) {
    if (color[COLORINFO.comuna]) {
      return <div>
        <p className="text-sm font-bold">Comuna:</p>
        <p className="text-sm">&nbsp;&nbsp;&nbsp;{color[COLORINFO.comuna]}</p>
      </div>
    }
  }

  function season(color) {
    if (color[COLORINFO.season]) {
      return <div>
        <p className="text-sm font-bold">Estación:</p>
        <p className="text-sm">&nbsp;&nbsp;&nbsp;{color[COLORINFO.season]}</p>
      </div>
    }
  }

  function sample(color) {
    if (color[COLORINFO.sampleName]) {
      return <div>
        <p className="text-sm font-bold">Muestra:</p>
        <p className="text-sm">&nbsp;&nbsp;&nbsp;{color[COLORINFO.sampleName]}</p>
      </div>
    }
  }

  function image(color) {
    if (color[COLORINFO.image]) {
      return <div class="my-1/4 mx-auto h-32 w-32">
        <img
          src={color[COLORINFO.image]}
          alt={color[COLORINFO.sampleName]}
          class="h-32 w-32 translate-y-1/3 rounded-full border-4 border-blue-700 shadow-xl"
          style={{
            border: `4px solid ${colorStyle.color}`
          }}
        />
      </div>
    }
  }

  function ncs(color) {
    if (color[COLORINFO.ncsNuance] && color[COLORINFO.ncsHue]) {
      return <div>
        <p className="text-sm font-bold">Natural Color System:</p>
        <p className="text-sm">&nbsp;&nbsp;&nbsp;NCS {color[COLORINFO.ncsNuance]}-{color[COLORINFO.ncsHue]}</p>
      </div>
    }
  }

  function munsell(color) {
    if (color[COLORINFO.munsellPage] && color[COLORINFO.munsellHue] && color[COLORINFO.munsellValue] && color[COLORINFO.munsellChroma] && color[COLORINFO.munsellName]) {
      return <div>
        <p className="text-sm font-bold">Munsell:</p>
        <p className="text-sm">&nbsp;&nbsp;&nbsp;{color[COLORINFO.munsellHue]}/ {color[COLORINFO.munsellChroma]}</p>
        <p className="text-sm">&nbsp;&nbsp;&nbsp;Nombre: {color[COLORINFO.munsellName]}</p>
      </div>
    }
  }

  function cielab(color) {
    if (color[COLORINFO.cielabL] && color[COLORINFO.cielabA] && color[COLORINFO.cielabB]) {
      return <div>
        <p className="text-sm font-bold">CIELab:</p>
        <p className="text-sm">&nbsp;&nbsp;&nbsp;L*: {color[COLORINFO.cielabL]}</p>
        <p className="text-sm">&nbsp;&nbsp;&nbsp;a*: {color[COLORINFO.cielabA]}</p>
        <p className="text-sm">&nbsp;&nbsp;&nbsp;b*: {color[COLORINFO.cielabB]}</p>
      </div>
    }
  }

  function rgb(color) {
    if (color[COLORINFO.rgbR] && color[COLORINFO.rgbG] && color[COLORINFO.rgbB]) {
      return <div>
        <p className="text-sm font-bold">RGB:</p>
        <p className="text-sm">&nbsp;&nbsp;&nbsp;{color[COLORINFO.rgbR]}, {color[COLORINFO.rgbG]}, {color[COLORINFO.rgbB]}</p>
      </div>
    }
  }

  function cmyk(color) {
    if (color[COLORINFO.cmykC] && color[COLORINFO.cmykM] && color[COLORINFO.cmykY] && color[COLORINFO.cmykK]) {
      return <div>
        <p className="text-sm font-bold">CMYK:</p>
        <p className="text-sm">&nbsp;&nbsp;&nbsp;{color[COLORINFO.cmykC]}C {color[COLORINFO.cmykM]}M {color[COLORINFO.cmykY]}Y {color[COLORINFO.cmykK]}K</p>
      </div>
    }
  }

  function ceresita(color) {
    if (color[COLORINFO.ceresitaName]) {
      return <div>
        <p className="text-sm font-bold">Ceresita: { }</p>
        <p className="text-sm">&nbsp;&nbsp;&nbsp;{color[COLORINFO.ceresitaName]}</p>
      </div>
    }
  }

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const styleBG = colorRGB(color?.[RGB.R], color?.[RGB.G], color?.[RGB.B]);

  const getMaxColorValue = (R, G, B) => {
    console.log("El valor mayor es:", Math.max(R, G, B));
    return Math.max(R, G, B);
  };

  // Asigna el color de fondo y de texto segun el color de la carta cromatica
  let BGColor = "rgb(235, 235, 235)"; // Fondo gris claro
  let FontColor = "rgb(0, 0, 0)"; // Texto negro
  if (getMaxColorValue(color?.[RGB.R], color?.[RGB.G], color?.[RGB.B]) > 230) {
    // En caso de ser muy claro
    BGColor = "rgb(35, 35, 35)"; // Fondo gris oscuro
    FontColor = "rgb(255, 255, 255)"; // Texto blanco
  }

  //Estilo para el título (cambia el color del texto según la selección)
  console.log(`${color?.[COLORINFO.rgbR]}, ${color?.[COLORINFO.rgbG]}, ${color?.[COLORINFO.rgbB]}`);
  let colorStyle = {
    color: `rgb(${color?.[COLORINFO.rgbR]},${color?.[COLORINFO.rgbG]},${color?.[COLORINFO.rgbB]})`,
    backgroundColor: `rgb(${color?.[COLORINFO.rgbR]},${color?.[COLORINFO.rgbG]},${color?.[COLORINFO.rgbB]})`,
  }

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

  function addColorToPalette(colorObject){
    setColorToPalette(colorObject)

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
        const text = color[COLORINFO.objeto];
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
        <div class="w-1/5 align-center fixed top-0 right-0 flex min-h-screen flex-col justify-center overflow-hidden bg-gray-100 shadow-lg">

          <div class="w-full bg-gray-300 shadow-md">
            <button class="float-right m-2" onClick={toggleDrawer}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-gray-900">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <div class="m-12 rounded-md shadow-xl" style={colorStyle}>
              {image(color)}
            </div>
          </div>

          <div class="text-gray-900 w-full flex-1 pl-4 pr-2">
            <div>
              {name(color)}
            </div>
            <div class="justify-left h-96 overflow-y-scroll">
              <p class="py-4 text-center text-xl font-semibold">Información</p>
              {category(color)}
              {comuna(color)}
              {season(color)}
              {sample(color)}
              <p class="py-4 text-center text-xl font-semibold">Códigos</p>
              {ncs(color)}
              {munsell(color)}
              {cielab(color)}
              {rgb(color)}
              {cmyk(color)}
              {ceresita(color)}
            </div>
          </div>

          <div class="flex h-1/5 justify-between p-4">
            <button class="flex items-center rounded-md bg-pink-500 px-4 py-2 text-white" onClick={() => addColorToPalette(color)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke="currentColor" class="mr-2 h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21.35l-1.45-1.32C5.4 14.36 2 11.23 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.73-3.4 6.86-8.55 12.54L12 21.35z"></path>
              </svg>
            </button>

            <button class="flex items-center rounded-md bg-green-500 px-4 py-2 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="mr-2 h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
              </svg>
            </button>

            <button class="flex items-center rounded-md bg-green-500 px-4 py-2 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="mr-2 h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.293 5.293A1 1 0 0013 6.707L10 10.586 6.707 6.293a1 1 0 00-1.414 1.414L8.586 12l-3.293 3.293a1 1 0 101.414 1.414L10 13.414l3.293 3.293a1 1 0 001.414-1.414L11.414 12l3.293-3.293a1 1 0 000-1.414z m-5.306 7.928a2 2 0 100-4 2 2 0 000 4zM11 9h2v6h-2z"/>
              </svg>
            </button>
          </div>
        </div>
      ) : (<></>)}</>
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
