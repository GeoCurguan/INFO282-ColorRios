import React, { useState, useEffect } from "react";
import { RGB, COLORINFO } from "@/constants/properties";
import { colorRGB } from "@/utils";
import styles from "./styles/ColorDetail.module.css";
import { CloseIcon } from "@/icons";
import Image from "next/image";

function rgbToHex(red, green, blue) {
  const rgb = (red << 16) | (green << 8) | (blue << 0);
  return '#' + (0x1000000 + rgb).toString(16).slice(1);
}

const ColorDetail = ({ color, setCurrentColor, setColorToPalette }) => {
  //Estados de la barra

  function name(color) {
    if (color[COLORINFO.colorName]) {
      return <h2 id="colorTitle" className="w-full leading-none text-center font-extrabold" style={titleStyle}>
        {color[COLORINFO.colorName]}
      </h2>
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
      return <img
        src={color[COLORINFO.image]}
        alt={color[COLORINFO.sampleName]}
        className="h-32 w-32 object-cover"
        style={{
          borderRadius: "50%",
          border: `4px solid ${titleStyle.color}`,
          backgroundColor: BGColor,
        }}
      />
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
        <p className="text-sm">&nbsp;&nbsp;&nbsp;{color[COLORINFO.munsellHue]} {color[COLORINFO.munsellHue]}/{color[COLORINFO.munsellChroma]}</p>
        <p className="text-sm">&nbsp;&nbsp;&nbsp;Nombre: {color[COLORINFO.munsellName]}</p>
      </div>
    }
  }

  function cielab(color) {
    if (color[COLORINFO.cielabL] && color[COLORINFO.cielabA] && color[COLORINFO.cielabB]){
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
  const titleStyle = {
    color: colorRGB(color?.[RGB.R], color?.[RGB.G], color?.[RGB.B]).backgroundColor,
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

  function addColorToPalette(hexColor){
    //console.log(hexColor)
    setColorToPalette(hexColor)
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
    </>
  );
};

export default ColorDetail;
