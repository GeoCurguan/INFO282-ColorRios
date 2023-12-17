import { useState, useEffect } from "react";
import Nav from "@/components/Navbar/Nav";
import TopColors from "@/components/Top/TopColors";
import TopPalettes from "@/components/Top/TopPalettes";
import ColorDetail from "@/components/ColorDetail/ColorDetail";
import PalettesColor from "@/components/Top/PalettesColors";
import { useAuthContext } from "@/context/AuthContext";

// La pagina Social debe hacer lo siguiente:
// 1) Barra de Navegacion para moverse entre paginas.
// 2) Mostrar los 3 colores mas clickeados por todos los usuarios este mes? (consulta a la base de datos)
// 3) Mostrar los 3 colores que mas aparecen en paletas creadas este mes? (consulta a la base de datos)
// 4) Mostrar las paletas creadas este mes? (consulta a la base de datos)
// 5) Al hacer click en un color aparece en la derecha los detalles.

const Social = () => {
  const { username, auth: token } = useAuthContext();
  const [palettes, setPalettes] = useState([]);
  const [errorPalettes, setErrorPalettes] = useState(false);

  useEffect(() => {
    const getPalettes = async () => {
      try {
        const response = await fetch(`/api/palette_color/getPalettesColor`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPalettes(data);
        } else {
          setErrorPalettes(true);
        }
      } catch (error) {
        console.log(error);
        setErrorPalettes(true);
      }
    };
    getPalettes();
  }, []);

  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <>
      <Nav />
      <div className="flex">
        <div className="w-4/5 h-screen bg-gray-800 p-4 overflow-y-auto space-y-4">
          <TopColors setSelectedColor={setSelectedColor} />
          <TopPalettes setSelectedColor={setSelectedColor} />

          <h2 className="text-2xl text-center text-gray-200 font-bold mb-4">Paletas de colores</h2>
          {errorPalettes ? (
            <p className="text-white text-center">No se pudo cargar la información.</p>
          ) : (
            palettes.map((palette) => (
              <PalettesColor setSelectedColor={setSelectedColor} key={palette.id} palette={palette} />
            ))
          )}
        </div>

        <ColorDetail color={selectedColor} setCurrentColor={setSelectedColor} />
      </div>
    </>
  );
};

export default Social;
