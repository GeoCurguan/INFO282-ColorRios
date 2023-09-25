import Color from "./Color";

// colors corresponde a un arreglo de muchos arreglos
const Colors = ({ colors }) => {
  return (
    <>
      {colors?.map((color, index) => (
        <Color key={index} color={color} />
      ))}
    </>
  );
};

export default Colors;
