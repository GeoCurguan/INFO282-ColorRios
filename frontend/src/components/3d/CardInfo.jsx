import { COLORINFO } from "@/constants/properties";

const CardInfo = ({ currentColor }) => {
  if (!currentColor) return null;
  let nuance = currentColor[COLORINFO.ncsNuance];
  // Si el último digito de nuance no es un "-" entonces agregarlo
  if (nuance[nuance.length - 1] !== "-") nuance += "-";
  const hue = currentColor[COLORINFO.ncsHue];

  const r = currentColor[COLORINFO.rgbR];
  const g = currentColor[COLORINFO.rgbG];
  const b = currentColor[COLORINFO.rgbB];

  const handleCopy = () => {
    const rgb = `rgb(${r}, ${g}, ${b})`;
    navigator.clipboard.writeText(rgb);
    alert(`Copied ${rgb} to clipboard`);
  };

  return (
    <div className="absolute bottom-0 left-0 flex flex-col justify-end p-4 text-gray-950">
      <h2 className="text-2xl font-bold">
        NCS {nuance}
        {hue}
      </h2>
      <div onClick={handleCopy} className="text-lg flex items-center gap-2 cursor-pointer">
        <div className="w-8 h-8 inline-block" style={{ backgroundColor: `rgb(${r},${g},${b})` }}></div>
        RGB({r}, {g}, {b})
      </div>
    </div>
  );
};

export default CardInfo;
