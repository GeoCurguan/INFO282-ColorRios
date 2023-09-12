const colorRGB = (R, G, B) => {
  // ¿No existe alguno de los colores? Devuelve transparente
  if (R === undefined || G === undefined || B === undefined) return { backgroundColor: "transparent" };

  // Color que corresponde
  return { backgroundColor: `rgb(${R}, ${G}, ${B})` };
};
export { colorRGB };
