/*
Esto creo que podría ser útil para definir como constante los atributos del objeto

Ejemplo: data[RGB] sería lo mismo que data.rgb
En el caso de que se quiera cambiar el nombre de la propiedad, se cambia en un solo lugar


*/

const OBJETO = 1;
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
    imageUrl: 5,
    description: 4,
    comuna: 1,
};

export { OBJETO, EXPEDICION, RGB, COLORINFO };
