import React, { useState } from "react";
import Color from "./Color";

const Colors = ({ colors, setCurrentColor }) => {
    const [selectedColor, setSelectedColor] = useState(null);

    const handleColorSelect = (selectedColor) => {
        setSelectedColor(selectedColor);
        setCurrentColor(selectedColor);
    };

    return (
        <>
            {colors?.map((color, index) => (
                <Color
                    key={index}
                    color={color}
                    setCurrentColor={handleColorSelect}
                    isSelected={color === selectedColor}
                />
            ))}
        </>
    );
};

export default Colors;
