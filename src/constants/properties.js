/*
Esto creo que podría ser útil para definir como constante los atributos del objeto

Ejemplo: data[RGB] sería lo mismo que data.rgb
En el caso de que se quiera cambiar el nombre de la propiedad, se cambia en un solo lugar


*/

const OBJETO = 0;
const COMUNA = 1;
const ESTACION = 2;
const EXPEDICION = 2;

const R = 17;
const G = 18;
const B = 19;

const RGB = {
  R,
  G,
  B,
};

const COLORINFO = {
  objeto: 3,
  category: 0,
  comuna: 1,
  season: 2,
  colorName: 3,
  sampleName: 4,
  image: 5,
  ncsNuance: 6,
  ncsHue: 7,
  munsellPage: 8,
  munsellHue: 9,
  munsellValue: 10,
  munsellChroma: 11,
  munsellName: 12,
  cielabL: 13,
  cielabA: 14,
  cielabB: 15,
  pantoneCode: 16,
  rgbR: 17,
  rgbG: 18,
  rgbB: 19,
  cmykC: 20,
  cmykM: 21,
  cmykY: 22,
  cmykK: 23,
  ceresitaName: 24,
};

export { OBJETO, ESTACION, COMUNA, EXPEDICION, RGB, COLORINFO };
