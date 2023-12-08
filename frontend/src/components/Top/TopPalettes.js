import React, { useState, useEffect } from 'react';

const TopPalettes = ({ username }) => {
  const [Palettes, setPalettes] = useState([]);
  let title = "";

  useEffect(() => {

    // Usado en la pagina Social
    const fetchData = async () => {
      // Funcion que busca TopPalettes por ???.
      try {
        const response = await fetch('/api/getPalettes/Top');
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
      // Funcion que busca Todas las Paletas de un Usuario
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
      title = "Tus Paletas"
      fetchDataUsername(); // Busca la Data con un usuario especifico.
    } else {
      title = "Paletas Populares"
      fetchData();  // Busca la Data general, sin usuario.
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
              {showColors(palette["colors"])}
            </div>
            <button class="mt-2 h-10 w-24 rounded-xl font-bold text-white bg-pink-400" onClick={() => likePalette(palette["id"])}> Me Gusta </button>
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
        <>
        <div style={{ backgroundColor: divColor }} class="h-14 w-full rounded"></div>
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
            class={`h-14 w-full ${index === 0 ? 'rounded-l' : ''} ${index === colors.length - 1 ? 'rounded-r' : ''}`}
          ></div>
        );
      });
    }
  }

  function likePalette(paletteID){

  }

  return (
    <div class="rounded-xl bg-gray-300 shadow-md">
      <div class="w-full h-12 rounded-t-xl bg-gray-100 shadow-md flex items-center justify-center text-center text-2xl font-bold">{title}</div>

      {showPalettes(palettes)}

    </div>);
}

export default TopPalettes