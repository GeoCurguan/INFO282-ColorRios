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
  id: 0,
  category: 1,
  expedition: 2,
  comuna: 3,
  season: 4,
  year: 5,
  month: 6,
  day: 7,
  placeName: 8,
  placeNumber: 9,
  object: 10,
  commonName: 11,
  scientificName: 12,
  soilType: 13,
  latitude: 14,
  longitude: 15,
  altitude: 16,
  generalImage: 17,
  detailedImage: 18,
  chromaticImage: 19,
  measurementImage: 20,
  imageNumber: 21,
  sampleNumber: 22,
  drySample: 23,
  wetSample: 24,
  ncsNuance: 25,
  ncsHue: 26,
  munsellPage: 27,
  munsellHue: 28,
  munsellValue: 29,
  munsellChroma: 30,
  munsellName: 31,
  cielabL: 32,
  cielabA: 33,
  cielabB: 34,
  pantoneCode: 35,
  rgbR: 36,
  rgbG: 37,
  rgbB: 38,
  cmykC: 39,
  cmykM: 40,
  cmykY: 41,
  cmykK: 42,
  ceresitaName: 43,
  hex: 44,
  colorName: 46,
  hue: 47
};

export { OBJETO, ESTACION, COMUNA, EXPEDICION, RGB, COLORINFO };
