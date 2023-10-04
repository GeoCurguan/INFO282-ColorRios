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
export { colorRGB, colorRGBExist };
