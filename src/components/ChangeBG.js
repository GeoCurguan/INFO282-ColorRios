import { useState } from "react";

const ChangeBG = () => {
    const [color, setColor] = useState("bg-zinc-200");
    const changeBackgroundColor = (_color) => {
        document.body.classList.remove(color);
        setColor(_color);
        document.body.classList.add(_color);
    };

    const grayshades = ["bg-zinc-200", "bg-neutral-200", "bg-stone-200"];

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-700 rounded-lg">
            <p className="text-lg font-semibold mb-2 mt-2 text-zinc-200">
                Escoge tu fondo gris favorito 🧐
            </p>
            <div className="flex flex-row md:flex-wrap items-center justify-center gap-2 mb-4">
                {grayshades.map((color) => (
                    <button
                        key={color}
                        className={`w-12 h-12 rounded-full ${color} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:shadow-lg transition-transform transform hover:scale-110`}
                        onClick={() => changeBackgroundColor(color)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChangeBG;
