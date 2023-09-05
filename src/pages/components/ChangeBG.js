// Esto se puede borrar dsp xd

import { useState } from "react";

const ChangeBG = () => {
  const [color, setColor] = useState("bg-zinc-200");
  const changeBackgroundColor = (_color) => {
    document.body.classList.remove(color);
    setColor(_color);
    document.body.classList.add(_color);
  };

  const grayshades = [
    "bg-zinc-200",
    "bg-zinc-300",
    "bg-zinc-400",
    "bg-neutral-200",
    "bg-neutral-300",
    "bg-neutral-400",
    "bg-neutral-500",
    "bg-neutral-600",
    "bg-stone-200",
    "bg-stone-300",
    "bg-stone-400",
    "bg-stone-500",
    "bg-stone-600",
  ];

  return (
    <div className="flex flex-col md:flex-wrap items-center justify-center w-full h-full">
      {grayshades.map((color) => (
        <button
          key={color}
          className={`w-12 h-12 rounded-full ${color} mb-4`}
          onClick={() => changeBackgroundColor(color)}
        />
      ))}
    </div>
  );
};

export default ChangeBG;
