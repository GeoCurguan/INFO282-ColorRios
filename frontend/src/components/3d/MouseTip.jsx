import { useState } from "react";
import styles from "./styles/MouseTip.module.css";
import { MouseIcon, CursorIcon, TopBottomArrowIcon, ZoomIcon, AllDirectionsArrowIcon, RotateArrowIcon } from "@/icons";

const MouseTip = () => {
  return (
    <div className="hidden sm:flex absolute bottom-0 right-0  flex-col justify-end p-4 text-gray-950">
      <h2 className="text-2xl font-bold">Navegación</h2>
      <section className="flex flex-col gap-2">
        <Zoom />
        <Rotate />
        <Move />
      </section>
    </div>
  );
};

// ------------- ZOOM -------------
const Zoom = () => {
  const [scroll, setScroll] = useState(true);
  const handleOnMouse = () => {
    setScroll(!scroll);
  };
  return (
    <article
      className="text-sm flex items-center gap-2 select-none"
      title="Zoom"
      onMouseEnter={handleOnMouse}
      onMouseLeave={handleOnMouse}
    >
      <ZoomIcon
        className={`w-4 h-4 transition-all duration-300 ease-in-out ${scroll ? "scale-100" : "scale-[1.15]"}`}
      />
      <p className="font-bold">=</p>
      <MouseScroll scroll={scroll} />
      <MouseIcon />
    </article>
  );
};

const MouseScroll = ({ scroll }) => {
  return (
    <div className="w-1 h-4 bg-gray-950 rounded-full">
      <div
        className={`w-1 h-1 bg-red-500 rounded-full
          transition-all duration-300 ease-in-out ${scroll ? "translate-y-3" : "translate-y-0"}`}
      ></div>
    </div>
  );
};

// ------------- ROTATE -------------
const Rotate = () => {
  const [rotate, setRotate] = useState(false);
  const handleOnMouse = () => {
    setRotate(!rotate);
  };
  return (
    <article
      className={`text-sm flex items-center gap-2 select-none transition-all duration-300 ease-in-out ${styles.perspective} `}
      title="Rotar"
      onMouseEnter={handleOnMouse}
      onMouseLeave={handleOnMouse}
    >
      <div className={`${styles.perspective}`}>
        <RotateArrowIcon
          className={`w-4 h-4 transition-all duration-300 ease-in-out ${styles.preserve3d}
        ${rotate ? styles.rotate : ""} `}
        />
      </div>
      <p className="font-bold transition-all duration-300 ease-in-out">
        = <span className={`${rotate ? "animate-pulse" : ""}`}> CLICK </span>+
      </p>
      <CursorIcon
        className={`w-4 h-4 transition-all duration-300 ease-in-out
        ${rotate ? "translate-x-1 translate-y-1" : ""}
      `}
      />
    </article>
  );
};

// ------------- MOVE -------------
const Move = () => {
  const [move, setMove] = useState(false);
  const handleOnMouse = () => {
    setMove(!move);
  };
  return (
    <article
      className="text-sm flex items-center gap-2 select-none"
      title="Mover"
      onMouseEnter={handleOnMouse}
      onMouseLeave={handleOnMouse}
    >
      <AllDirectionsArrowIcon
        className={`w-4 h-4 transition-all duration-300 ease-in-out ${move ? "-translate-x-1 -translate-y-1" : ""}`}
      />
      <p className="font-bold">
        = <span className={`transition-all duration-300 ease-in-out ${move ? "animate-pulse" : ""}`}>CTRL</span> +
      </p>
      <CursorIcon
        className={`w-4 h-4 transition-all duration-300 ease-in-out ${move ? "translate-x-1 translate-y-1" : ""}`}
      />
    </article>
  );
};

export default MouseTip;
