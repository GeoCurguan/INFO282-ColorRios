/*
Esto creo que podría ser útil para definir como constante los atributos del objeto

Ejemplo: data[RGB] sería lo mismo que data.rgb
En el caso de que se quiera cambiar el nombre de la propiedad, se cambia en un solo lugar


*/

const OBJETO = 1;
const EXPEDICION = 2;

const R = 34;
const G = 35;
const B = 36;

const RGB = {
  R,
  G,
  B,
};

export { OBJETO, EXPEDICION, RGB };
