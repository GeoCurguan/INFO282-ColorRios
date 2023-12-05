import React, { useState, useEffect } from 'react';

const TopPalettes = ({ username }) => {
  const [Palettes, setPalettes] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      // TopPalettes por Click
      try {
        const response = await fetch('/api/topPalettes');
        if (!response.ok) {
          throw new Error('Error al obtener las paletas mas populares.');
        }

        const data = await response.json();
        setPalettes(data.palettes);
      } catch (error) {
        console.error(error.message);
      }
    };

    // Usado en la pagina Perfil
    const fetchDataUsername = async () => {
      // Paletas por Usuario
      try {
        const response = await fetch('/api/getPalettes/${username}');
        if (!response.ok) {
          throw new Error('Error al obtener las paletas del usuario ${username}.');
        }

        const data = await response.json();
        setPalettes(data.palettes);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (username) { // Llama a una funcion dependiendo si existe usuario o no.
      const title = "Tus Paletas"
      fetchDataUsername();
    } else {
      const title = "Paletas Populares"
      fetchData();
    }

  }, [username]); //Hook. Cuando estas variables cambien, se vuelve a ejecutar el useEffect.

  // Definir funcion para construir las paletas.

  function showPalettes(palettes) {
    return (
      <div>
        {palettes.map((palette, index) => (
          <div key={index} class="w-full p-4">
            <h1>{`Paleta Numero ${index + 1}`}</h1>
            <div class="flex items-center space-x-1">
              {showColors(palette)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function showColors(colors) {
    if (colors.length === 1) {
      // Si el array colors tiene solo un color
      const divColor = `rgb(${colors[0]["R"]}, ${colors[0]["G"]}, ${colors[0]["B"]})`;
      return (
        <div style={{ backgroundColor: divColor }} className="h-14 w-full rounded"></div>
      );
    } else {
      // Si el array colors tiene más de un color
      return colors.map((color, index) => {
        const divColor = `rgb(${colors[index]["R"]}, ${colors[index]["G"]}, ${colors[index]["B"]})`;
        return (
          <div
            key={index}
            style={{ backgroundColor: divColor }}
            className={`h-14 w-full ${index === 0 ? 'rounded-l' : ''} ${index === colors.length - 1 ? 'rounded-r' : ''}`}
          ></div>
        );
      });
    }
  }

  return (
    <div class="rounded-xl bg-gray-300 shadow-md">
      <div class="w-full h-12 rounded-t-xl bg-gray-100 shadow-md flex items-center justify-center text-center text-2xl font-bold">{title}</div>

      {showPalettes(palettes)}

    </div>);
}

export default TopPalettes