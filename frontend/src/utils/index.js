import { COLORINFO } from "@/constants/properties";

const colorRGBExist = (R, G, B) => {
  // ¿No existe alguno de los colores? Devuelve transparente
  if (R === undefined || R === null || G === undefined || G === null || B === undefined || B === null) return false;
  if (R === "" || G === "" || B === "") return false;

  // Color que corresponde
  return true;
};

const colorRGB = (R, G, B) => {
  // ¿No existe alguno de los colores? Devuelve transparente
  if (R === undefined || G === undefined || B === undefined) return { backgroundColor: "transparent" };

  // Color que corresponde
  return { backgroundColor: `rgb(${R}, ${G}, ${B})` };
};

const uniqueValuesFilters = (colors) => {
  const objetos = [
    ...new Set(
      colors.map((color) => {
        if (color[COLORINFO.category] === undefined || color[COLORINFO.category] === null) return "";
        return color[COLORINFO.category].toLowerCase();
      })
    ),
  ];

  const comunas = [
    ...new Set(
      colors.map((color) => {
        if (color[COLORINFO.comuna] === undefined || color[COLORINFO.comuna] === null) return "";
        return color[COLORINFO.comuna].toLowerCase();
      })
    ),
  ];

  const colores = [
    ...new Set(
      colors.map((color) => {
        if (color[COLORINFO.colorFilter] === undefined || color[COLORINFO.colorFilter] === null) return "";
        return color[COLORINFO.colorFilter].toLowerCase();
      })
    ),
  ];

  if (objetos.includes("")) {
    objetos.splice(objetos.indexOf(""), 1);
  }
  if (comunas.includes("")) {
    comunas.splice(comunas.indexOf(""), 1);
  }

  if (colores.includes("")) {
    colores.splice(colores.indexOf(""), 1);
  }

  const uniqueValuesFilters = {
    objetos,
    comunas,
    colores,
  };
  return uniqueValuesFilters;
};

function rgbToHex(red, green, blue) {
  const rgb = (red << 16) | (green << 8) | (blue << 0);
  return "#" + (0x1000000 + rgb).toString(16).slice(1);
}

export { uniqueValuesFilters, colorRGB, colorRGBExist, rgbToHex };
