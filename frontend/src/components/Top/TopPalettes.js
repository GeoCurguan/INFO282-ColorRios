import React, { useState, useEffect } from "react";

const TopPalettes = ({ setSelectedColor }) => {
  const [palettes, setPalettes] = useState([]);
  let title = "";

  useEffect(() => {
    // Usado en la pagina Social
    const fetchData = async () => {
      // Funcion que busca TopPalettes por ???.
      try {
        const response = await fetch("/api/getTopPalettes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener las paletas mas populares.");
        }
        const data = await response.json();
        setPalettes(data.palettes);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();

    // // Usado en la pagina Perfil
    // const fetchDataUsername = async () => {
    //   // Funcion que busca Todas las Paletas de un Usuario
    //   try {
    //     const response = await fetch('/api/getPalettes/${username}');
    //     if (!response.ok) {
    //       throw new Error('Error al obtener las paletas del usuario con la Id: ${username}.');
    //     }

    //     const data = await response.json();
    //     setPalettes(data.palettes);
    //   } catch (error) {
    //     console.error(error.message);
    //   }
    // };

    // if (username) { // Llama a una funcion dependiendo si existe usuario o no.
    //   title = "Tus Paletas"
    //   fetchDataUsername(); // Busca la Data con un usuario especifico.
    // } else {
    //   title = "Paletas Populares"
    //   fetchData();  // Busca la Data general, sin usuario.
    // }
  }, []);

  return (
    <div className="rounded-xl bg-gray-300 shadow-md">
      <div className="w-full h-12 rounded-t-xl bg-gray-100 shadow-md flex items-center justify-center text-center text-2xl font-bold">
        {title}
      </div>

      <ShowPalettes setSelectedColor={setSelectedColor} palettes={palettes} />
    </div>
  );
};

const ShowPalettes = ({ setSelectedColor, palettes }) => {
  return (
    <div>
      {palettes.map((palette, index) => (
        <div key={index} className="w-full p-4">
          <div className="flex items-center space-x-1 mb-2">
            <p className="text-black font-bold">{palette["nombre_palette"]}</p>
            <h2 className="text-gray-500">por {palette["username"]}</h2>
          </div>
          <div className="flex items-center space-x-1">
            <ShowColors setSelectedColor={setSelectedColor} colors={palette["colors"]} />
          </div>
          {/* <div className="mt-2 flex items-center space-x-1">
            <button
              className="h-8 w-24 rounded-xl bg-pink-400 font-bold text-white"
              onClick={() => likePalette(palette["id"])}
            >
              {" "}
              Me Gusta{" "}
            </button>
            <button
              className="h-8 w-24 rounded-xl bg-blue-400 font-bold text-white"
              onClick={() => downloadPalette(palette["id"])}
            >
              {" "}
              Descargar{" "}
            </button>
          </div> */}
        </div>
      ))}
    </div>
  );
};

const ShowColors = ({ setSelectedColor, colors }) => {
  if (colors.length === 1) {
    // Si el array colors tiene solo un color
    const divColor = `rgb(${colors[0]["R"]}, ${colors[0]["G"]}, ${colors[0]["B"]})`;
    return (
      <>
        <div
          style={{ backgroundColor: divColor }}
          className="cursor-pointer  h-14 w-full rounded"
          onClick={() => setSelectedColor(colors[0])}
        ></div>
      </>
    );
  } else {
    // Si el array colors tiene más de un color
    return colors.map((color, index) => {
      const divColor = `rgb(${colors[index]["R"]}, ${colors[index]["G"]}, ${colors[index]["B"]})`;
      return (
        <div
          key={index}
          style={{ backgroundColor: divColor }}
          className={`cursor-pointer h-14 w-full ${index === 0 ? "rounded-l" : ""} ${
            index === colors.length - 1 ? "rounded-r" : ""
          }`}
          onClick={() => setSelectedColor(color)}
        ></div>
      );
    });
  }
};

export default TopPalettes;
