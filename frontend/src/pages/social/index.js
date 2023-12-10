import { useState, useEffect } from "react";
import Nav from "@/components/Navbar/Nav";
import TopColors from "@/components/Top/TopColors";
import TopPalettes from "@/components/Top/TopPalettes";
import ColorDetail from "@/components/ColorDetail/ColorDetail";

// La pagina Social debe hacer lo siguiente:
// 1) Barra de Navegacion para moverse entre paginas.
// 2) Mostrar los 3 colores mas clickeados por todos los usuarios este mes? (consulta a la base de datos)
// 3) Mostrar los 3 colores que mas aparecen en paletas creadas este mes? (consulta a la base de datos)
// 4) Mostrar las paletas creadas este mes? (consulta a la base de datos)
// 5) Al hacer click en un color aparece en la derecha los detalles.

const Social = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorClick = (color) => {
    // Actualizar la variable cuando se hace clic en un elemento en TopColors o TopPalettes
    setSelectedColor(color);
  };

  return (
    <>
      <Nav />

      <div className="flex">
        <div className="w-3/4 h-screen bg-gray-800 p-4 overflow-y-auto">
          {/* <TopColors onColorClick={handleColorClick} /> */}
          <TopPalettes onColorClick={handleColorClick} />
        </div>

        <ColorDetail color={selectedColor}/>
      </div>
    </>
  );
};

export default Social;
