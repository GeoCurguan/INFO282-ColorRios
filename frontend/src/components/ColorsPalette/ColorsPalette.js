import { useState, useEffect } from "react";
import styles from "./styles/ColorsPalette.module.css";
import { COLORINFO } from "@/constants/properties";
import { rgbToHex } from "@/utils";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "sonner";

import ExportPDF from "../ExportPDF/ExportPDF";

const ColorsPalette = ({ colorToPalette }) => {
  const [favoriteColors, setFavoriteColors] = useState([]);
  const [downloaded, setDownloaded] = useState(false);
  const { user, auth: token } = useAuthContext();
  const userExist = Object.keys(user).length > 0;

  const handleSavePalette = async () => {
    // 0. Validar usuario logueado
    if (Object.keys(user).length > 0) {
      const confirm = window.confirm("¿Desea guardar la paleta?");
      if (!confirm) return;

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
          body: JSON.stringify({ nombre_propietario: username, colors: colorsIDS, descargado: downloaded }),
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
    <div className="flex flex-row items-center justify-around w-full bg-zinc-800">
      {Palette}
      {favoriteColors.length > 0 ? (
        <div className="px-1 sm:px-2 flex flex-col items-center justify-center">
          <ExportPDF setDownloaded={setDownloaded} favoriteColors={favoriteColors} />
          {userExist && (
            <button onClick={handleSavePalette} className="text-white">
              Guardar
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
