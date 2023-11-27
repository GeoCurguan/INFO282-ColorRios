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
  //id: 0,
  category: 0,        //Objeto o Atmosfera
  expedition: 1,  
  comuna: 2,      
  season: 3,
  year: 4,
  month: 5,
  day: 6,
  placeName: 7,       // Nombre del lugar
  placeNumber: 8,     // Numero de Zona
  object: 9,         // 
  commonName: 10,     // Si es una planta, este es el nombre comun.
  scientificName: 11, // Si es una planta, este es el nombre cientifico.
  soilType: 12,       // Si es un suelo, este es el nombre cientifico.
  latitude: 13,       // Grados + 
  longitude: 14,
  altitude: 15,
  generalImage: 16,
  detailedImage: 17,
  chromaticImage: 18,
  measurementImage: 19,
  imageNumber: 20,
  sampleNumber: 21,
  drySample: 22,
  wetSample: 23,
  ncsNuance: 24,
  ncsHue: 25,
  munsellPage: 26,
  munsellHue: 27,
  munsellValue: 28,
  munsellChroma: 29,
  munsellName: 30,
  cielabL: 31,
  cielabA: 32,
  cielabB: 33,
  pantoneCode: 34,
  rgbR: 35,
  rgbG: 36,
  rgbB: 37,
  cmykC: 38,
  cmykM: 39,
  cmykY: 40,
  cmykK: 41,
  ceresitaName: 42,
  hex: 43,
  colorName: 44,
  colorFilter: 45
};

export { OBJETO, ESTACION, COMUNA, EXPEDICION, RGB, COLORINFO };
