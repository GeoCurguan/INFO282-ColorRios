import React, { useState, useEffect } from "react";
import { COLORINFO } from "@/constants/properties";

const TopColors = ({ setSelectedColor }) => {
  const [topColorsClicks, setTopColorsClicks] = useState([]);
  const [topColorsPalettes, setTopColorsPalettes] = useState([]);

  const handleColorClick = (color) => {
    onColorClick(color);
  };

  useEffect(() => {
    const fetchData = async () => {
      // TopColors por Click
      try {
        const response = await fetch("/api/getTopClicks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener los colores populares por clicks");
        }

        const data = await response.json();
        setTopColorsClicks(data.colors);
      } catch (error) {
        console.error(error.message);
      }
    };

    //   // Top Colors por NPaletas
    //   try {
    //     const response = await fetch("/api/colors/topbypalettes");
    //     if (!response.ok) {
    //       throw new Error("Error al obtener los colores populares por paletas");
    //     }

    //     const data = await response.json();
    //     setTopColorsPalettes(data.topColors);
    //   } catch (error) {
    //     console.error(error.message);
    //   }
    // };

    // const fetchDataUsername = async () => {
    //   // TopColors por Click + Usuario
    //   try {
    //     const response = await fetch("/api/colors/topbyclicks/${username}");
    //     if (!response.ok) {
    //       throw new Error("Error al obtener los colores populares por clicks de ese usuario");
    //     }

    //     const data = await response.json();
    //     setTopColorsClicks(data.topColors);
    //   } catch (error) {
    //     console.error(error.message);
    //   }
    //   // Top Colors por NPaletas + Usuario
    //   try {
    //     const response = await fetch("/api/colors/topbypalettes/${username}");
    //     if (!response.ok) {
    //       throw new Error("Error al obtener los colores populares por paletas de ese usuario");
    //     }

    //     const data = await response.json();
    //     setTopColorsPalettes(data.topColors);
    //   } catch (error) {
    //     console.error(error.message);
    //   }
    // };

    // if (username) {
    //   // Si fue entregado un username ocurre lo siguiente.
    //   fetchDataUsername();
    // } else {
    // }
    fetchData();
  }, []);

  return (
    <div className="rounded-xl bg-gray-300 shadow-md">
      <div className="w-full h-12 rounded-t-xl bg-gray-100 shadow-md flex items-center justify-center text-center text-2xl font-bold">
        Colores populares
      </div>
      <div className="flex flex-row py-4">
        <div className="flex w-full flex-col items-center justify-center">
          <h2 className="truncate text-center text-xl font-bold py-2">Mas Clickeados</h2>
          <ThreeColors setSelectedColor={setSelectedColor} colorsArray={topColorsClicks} />
        </div>

        {/* <div className="flex w-full flex-col items-center justify-center">
          <h2 className="truncate text-center text-xl font-bold py-2">En mas paletas</h2>
          {threeColors(topColorsPalettes)}
        </div> */}
      </div>
    </div>
  );
};

const ThreeColors = ({ setSelectedColor, colorsArray }) => {
  if (!colorsArray || colorsArray.length === 0) {
    return <></>;
  }
  return (
    <>
      <div
        onClick={() => setSelectedColor(colorsArray[0])}
        className="h-32 w-32 rounded cursor-pointer"
        style={{
          backgroundColor: `rgb(${colorsArray[0][COLORINFO.rgbR]}, ${colorsArray[0][COLORINFO.rgbG]}, ${
            colorsArray[0][COLORINFO.rgbB]
          })`,
        }}
      ></div>

      <div className="flex flex-row space-x-2 p-2">
        <div
          onClick={() => setSelectedColor(colorsArray[1])}
          className="h-14 w-14 rounded cursor-pointer"
          style={{
            backgroundColor: `rgb(${colorsArray[1][COLORINFO.rgbR]}, ${colorsArray[1][COLORINFO.rgbG]}, ${
              colorsArray[1][COLORINFO.rgbB]
            })`,
          }}
        ></div>
        <div
          onClick={() => setSelectedColor(colorsArray[2])}
          className="h-14 w-14 rounded cursor-pointer"
          style={{
            backgroundColor: `rgb(${colorsArray[2][COLORINFO.rgbR]}, ${colorsArray[2][COLORINFO.rgbG]}, ${
              colorsArray[2][COLORINFO.rgbB]
            })`,
          }}
        ></div>
      </div>
    </>
  );
};

export default TopColors;
