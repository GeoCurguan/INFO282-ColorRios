import React, { useState, useEffect } from "react";
import { HeartIcon, CloseIcon } from "@/icons";
import { COLORINFO } from "@/constants/properties";
import { colorRGB, rgbToHex } from "@/utils";

const ColorDetail = ({ color, setCurrentColor, setColorToPalette }) => {
  //Estados de la barra
  function name(color) {
    if (color[COLORINFO.colorName]) {
      return (
        <h1 data-testid="color-detail-title" className="text-3xl font-bold text-center" style={{ textWrap: "balance" }}>
          {color[COLORINFO.colorName]}
        </h1>
      );
    } else {
      return (
        <h1 className="text-3xl font-bold text-center text-gray-300" style={{ textWrap: "balance" }}>
          Sin Nombre
        </h1>
      );
    }
  }

  function category(color) {
    if (color[COLORINFO.category] === null || color[COLORINFO.category] === undefined) return <></>;

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
          <p className="text-sm capitalize">&nbsp;&nbsp;&nbsp;{color[COLORINFO.season]}</p>
        </div>
      );
    }
  }

  function sample(color) {
    if (color[COLORINFO.scientificName]) {
      return (
        <div>
          <p className="text-sm font-bold">Muestra:</p>
          <p className="text-sm">&nbsp;&nbsp;&nbsp;{color[COLORINFO.scientificName]}</p>
        </div>
      );
    }
  }

  function image(color) {
    if (color[COLORINFO.image]) {
      return (
        <div className="w-32 h-32 mx-auto my-1/4">
          <img
            src={color[COLORINFO.image]}
            alt={color[COLORINFO.colorName]}
            className="object-cover w-32 h-32 border-4 border-blue-700 rounded-full shadow-xl translate-y-1/3"
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
      typeof color[COLORINFO.munsellHue] !== "undefined" ||
      (color[COLORINFO.munsellHue] !== null && typeof color[COLORINFO.munsellValue] !== "undefined") ||
      (color[COLORINFO.munsellValue] !== null && typeof color[COLORINFO.munsellChroma] !== "undefined") ||
      (color[COLORINFO.munsellChroma] !== null && typeof color[COLORINFO.munsellName] !== "undefined") ||
      (color[COLORINFO.munsellName] !== null && typeof color[COLORINFO.munsellHue] !== "undefined") ||
      color[COLORINFO.munsellHue] !== null
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
    if (
      typeof color[COLORINFO.cielabL] !== "undefined" ||
      (color[COLORINFO.cielabL] !== null && typeof color[COLORINFO.cielabA] !== "undefined") ||
      (color[COLORINFO.cielabA] !== null && typeof color[COLORINFO.cielabB] !== "undefined") ||
      color[COLORINFO.cielabB] !== null
    ) {
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
    if (
      typeof color[COLORINFO.rgbR] !== "undefined" ||
      (color[COLORINFO.rgbR] !== null && typeof color[COLORINFO.rgbG] !== "undefined") ||
      (color[COLORINFO.rgbG] !== null && typeof color[COLORINFO.rgbB] !== "undefined") ||
      color[COLORINFO.rgbB] !== null
    ) {
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
    if (
      typeof color[COLORINFO.cmykC] !== "undefined" ||
      (color[COLORINFO.cmykC] !== null && typeof color[COLORINFO.cmykM] !== "undefined") ||
      (color[COLORINFO.cmykM] !== null && typeof color[COLORINFO.cmykY] !== "undefined") ||
      (color[COLORINFO.cmykY] !== null && typeof color[COLORINFO.cmykK] !== "undefined") ||
      color[COLORINFO.cmykK] !== null
    ) {
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
    // check if setColorToPalette exists
    if (setColorToPalette) setColorToPalette(colorObject);
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
          <div className="w-full bg-gray-300 shadow-md ">
            <button className="float-right m-2" onClick={toggleDrawer}>
              <CloseIcon className="w-6 h-6 text-gray-900" />
            </button>

            <div className="m-12 rounded-md shadow-xl" style={colorStyle}>
              {image(color)}
            </div>
          </div>

          <div className="flex-1 w-full pt-4 pl-4 pr-2 overflow-y-auto text-gray-900 sm:max-h-full sm:pr-0">
            <div>{name(color)}</div>
            <div className="flex items-center justify-center">
              <div
                className="mt-4 mb-4 rounded"
                style={{
                  backgroundColor: `rgb(${color[COLORINFO.rgbR]},${color[COLORINFO.rgbG]}, ${color[COLORINFO.rgbB]})`,
                  width: "150px",
                  height: "100px",
                }}
              ></div>
            </div>

            <div className="flex-1 justify-left">
              <p className="py-4 text-xl font-semibold text-center">Información</p>
              {category(color)}
              {comuna(color)}
              {season(color)}
              {sample(color)}
              <p className="py-4 text-xl font-semibold text-center">Códigos</p>
              {ncs(color)}
              {munsell(color)}
              {cielab(color)}
              {rgb(color)}
              {cmyk(color)}
              {ceresita(color)}
            </div>
          </div>

          <div className="flex justify-between w-full p-4">
            {setColorToPalette && (
              <button
                className="flex items-center px-2 py-2 text-white transition-colors duration-300 ease-in-out bg-pink-500 rounded-md hover:bg-pink-600"
                onClick={() => addColorToPalette(color)}
              >
                <HeartIcon className="w-6 h-6" fill="white" />
              </button>
            )}
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
                <section className="flex items-center justify-center h-10">
                  {name(color)}
                </section>

                <div className="h-32 rounded-xl" style={styleBG}></div>
                <div className="relative">
                  <div className="absolute w-32 h-32 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    {image(color)}
                  </div>
                </div>
                <div className="h-16 mb-2 justify-left"></div>

                <div className="overflow-y-scroll justify-left max-h-64" style={divStyle}>
                  <p className="py-2 text-xl font-bold text-center">Detalles de la Muestra</p>
                  {category(color)}
                  {comuna(color)}
                  {season(color)}
                  {sample(color)}
                  <p className="py-2 text-xl font-bold text-center">Códigos del Color</p>
                  {ncs(color)}
                  {munsell(color)}
                  {cielab(color)}
                  {rgb(color)}
                  {cmyk(color)}
                  {ceresita(color)}
                  <p className="text-sm font-bold">HEX</p>
                  <p className="text-sm">&nbsp;&nbsp;&nbsp;{color.hex}</p>
                </div>

                <button className="w-full p-2 mt-4 text-lg font-bold text-white rounded-lg" style={buttonStyle} onClick={() => addColorToPalette(rgbToHex(color[RGB.R], color[RGB.G], color[RGB.B]))}>
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
