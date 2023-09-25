import React, { useState } from "react";
import { RGB } from "@/constants/properties";
import { colorRGB } from "@/utils";

const Color = ({ color }) => {
    const styleBG = colorRGB(color[RGB.R], color[RGB.G], color[RGB.B]);

    //Funciones asociadas a la modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleColorClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="w-1/5 ">
            {/*---Color---*/}
            <div
                className="bg-white p-20 shadow-lg transition-transform transform hover:scale-110 cursor-pointer aspect-square"
                style={styleBG}
                onClick={handleColorClick}
            ></div>

            {/*---Modal---*/}
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-lg font-semibold">Código RGB:</h2>
                        <p>
                            {color[RGB.R]}, {color[RGB.G]}, {color[RGB.B]}
                        </p>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mt-4 rounded"
                            onClick={handleCloseModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Color;
