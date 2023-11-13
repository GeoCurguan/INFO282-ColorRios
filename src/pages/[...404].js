import Nav from "@/components/Navbar/Nav";
import Image from "next/image";

const CuatroCeroCuatro = () => {
  return (
    <>
      <Nav />
      <div className="mt-20 flex flex-col items-center justify-center font-bold text-gray-800">
        <div className="relative">
          <Image
            src="/images/404.png"
            alt="404"
            width={300}
            height={300}
            className="mb-8 drop-shadow-xl pointer-events-none user-select-none animate-spin-slow"
          />
        </div>
        <h1 className="text-6xl font-bold text-transparent text-center">
          <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text">Error 404</span>
        </h1>
        <h2 className="mb-8 text-2xl font-bold text-transparent">
          <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text">¡Página no encontrada!</span>
        </h2>
      </div>
    </>
  );
};

export default CuatroCeroCuatro;
