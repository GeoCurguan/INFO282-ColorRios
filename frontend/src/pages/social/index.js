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
  const [palettes, setPalettes] = useState([]);
  const [errorPalettes, setErrorPalettes] = useState(false);

  useEffect(() => {
    const getPalettes = async () => {
      try {
        const response = await fetch(`/api/palette_color/getPalettesColor`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPalettes(data);
          console.log(data);
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

  return (
    <>
      <Nav />

      <div className="flex">
        <div className="w-3/4 h-screen bg-gray-800 p-4 overflow-y-auto">
          {/* <script>// En Social TopColors y TopPalettes no deberia tener argumentos. En Perfil si.</script> */}
          {/* <TopColors /> */}
          {/* <TopPalettes /> */}
        </div>

        <ColorDetail />
      </div>
    </>
  );
};

export default Social;
