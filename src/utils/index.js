import { OBJETO, COMUNA } from "@/constants/properties";

const colorRGBExist = (R, G, B) => {
  // ¿No existe alguno de los colores? Devuelve transparente
  if (R === undefined || G === undefined || B === undefined) return false;
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
  // Recuperamos los objetos únicos
  // Recuepramos las comunas únicas

  const objetos = [...new Set(colors.map((color) => color[OBJETO].toLowerCase()))];
  const comunas = [...new Set(colors.map((color) => color[COMUNA].toLowerCase()))];
  if (objetos.includes("")) {
    objetos.splice(objetos.indexOf(""), 1);
  }
  if (comunas.includes("")) {
    comunas.splice(comunas.indexOf(""), 1);
  }
  const uniqueValuesFilters = {
    objetos,
    comunas,
  };
  return uniqueValuesFilters;
};

function rgbToHex(red, green, blue) {
  const rgb = (red << 16) | (green << 8) | (blue << 0);
  return '#' + (0x1000000 + rgb).toString(16).slice(1);
}

export { uniqueValuesFilters, colorRGB, colorRGBExist, rgbToHex};
