import Color from "./Color";

// colors corresponde a un arreglo de muchos arreglos
const Colors = ({ colors, setCurrentColor}) => {
  return (
    <>
      {colors?.map((color, index) => (
        <Color key={index} color={color} setCurrentColor={setCurrentColor}/>
      ))}
    </>
  );
};

export default Colors;
