import { useState, useEffect } from "react";
import styles from "./styles/ColorsPalette.module.css";
import { COLORINFO } from "@/constants/properties";
import { rgbToHex } from "@/utils";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "sonner";

import ExportPDF from "../ExportPDF/ExportPDF";

const ColorsPalette = ({ colorToPalette }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [favoriteColors, setFavoriteColors] = useState([]);
  const [downloaded, setDownloaded] = useState(false);
  const { user, auth: token } = useAuthContext();
  const userExist = Object.keys(user).length > 0;

  const handleSavePalette = async () => {
    // 0. Validar usuario logueado
    if (Object.keys(user).length > 0) {
      const confirm = window.confirm("¿Desea guardar la paleta?");
      if (!confirm) return;

      const nombre_palette = window.prompt("Ingrese el nombre de la paleta");

      // 1. Obtener los ids de los colores
      const colorsIDS = favoriteColors.map((color) => color.id);

      // 2. Obtener el nombre del usuario
      const { username } = user;

      // 3. Enviar la peticion a la API
      try {
        const response = await fetch("/api/insertPalette", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre_palette: nombre_palette,
            nombre_propietario: username,
            colors: colorsIDS,
            descargado: downloaded,
          }),
        });
        console.log(response);
        if (!response.ok) throw new Error("Error al guardar la paleta");
        const data = await response.json();
        console.log(data);
        // SUCCESS Reset favorite colors
        setFavoriteColors([]);
        setDownloaded(false);
        toast.success("Paleta guardada con exito");
      } catch (error) {
        console.log(error);
        toast.error("Error al guardar la paleta");
      }
    }
  };

  function removeColorToPalette(colorIdx) {
    setFavoriteColors((prevColors) => prevColors.filter((_, index) => index !== colorIdx));
  }

  useEffect(() => {
    if (colorToPalette && !favoriteColors.includes(colorToPalette)) {
      setFavoriteColors((prevColors) => [...prevColors, colorToPalette]);
    }
  }, [colorToPalette]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 132);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const Palette = [];
  for (let i = 0; i < 10; i++) {
    Palette.push(
      <div
        key={i}
        className={`bg-zinc-200 cursor-pointer ${styles.colorPalette}`}
        style={
          favoriteColors[i]
            ? {
                backgroundColor: rgbToHex(
                  favoriteColors[i][COLORINFO.rgbR],
                  favoriteColors[i][COLORINFO.rgbG],
                  favoriteColors[i][COLORINFO.rgbB]
                ),
              }
            : {}
        }
        onClick={() => removeColorToPalette(i)}
      ></div>
    );
  }

  return (
    <div className={`flex flex-row items-center justify-around w-full bg-zinc-800 ${isSticky ? styles.sticky  : ''}`}>
      {Palette}
      {favoriteColors.length > 0 ? (
        <div className="px-1 sm:px-2 flex flex-col items-center justify-center">
          <ExportPDF setDownloaded={setDownloaded} favoriteColors={favoriteColors} />
          {userExist && (
            <button onClick={handleSavePalette} className="text-white text-xs ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
  <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
  <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
</svg>

            </button>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};



export default ColorsPalette;

