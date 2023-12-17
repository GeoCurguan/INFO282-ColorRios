import { useAuthContext } from "@/context/AuthContext";

import ProtectedLogged from "@/components/Auth/protected/ProtectedLogged";
import Nav from "@/components/Navbar/Nav";
import ProfileCard from "@/components/profile/ProfileCard";
import TopColors from "@/components/Top/TopColors";
import TopPalettes from "@/components/Top/TopPalettes"; // ¿Donde colocamos los Colores mas importantes para el usuario? y Paletas del usuario.
import { useState, useEffect } from "react";
import PalettesColor from "@/components/PalettesColor/PalettesColors";
import Spinner from "@/components/spinner/Spinner";

const Page = () => {
  // TOOD: PERFIL - RUTA PROTEGIDA
  const { user, auth: token, handleLogout } = useAuthContext();
  const [palettesColors, setPalettesColors] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorPalettes, setErrorPalettes] = useState(false);
  const userNotEmpty = Object.keys(user).length !== 0;

  useEffect(() => {
    if (!userNotEmpty) {
      setLoading(false);
      setErrorPalettes("No se pudo cargar la información.");
      return;
    }
    // Si tenemos el usuario (data) podemos solicitar sus paletas de color
    const getPalettesColor = async () => {
      try {
        const { username } = user;
        const response = await fetch(`/api/getPalettes/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPalettesColors(data);
        } else {
          setErrorPalettes(true);
        }
      } catch (error) {
        setErrorPalettes(true);
      }
      setLoading(false);
    };
    getPalettesColor();
  }, []);

  return (
    <ProtectedLogged>
      <div className="custom-bg min-h-screen">
        <Nav />
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:items-start">
          {/* Left */}
          <div className="sm:w-1/2 mt-8 flex flex-col flex-wrap justify-center items-center">
            <ProfileCard user={user} />
            <div className="flex justify-center items-center">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-8"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
          {/* Right */}
          <div className="sm:w-1/2 mt-8 flex flex-col flex-wrap justify-center items-center">
            <h2 className="text-2xl text-gray-200 font-bold mb-4">Paletas de colores</h2>
            {loading && <Spinner isLoading={loading} />}
            {errorPalettes && <p className="mb-8 text-gray-800 text-xl">Error al cargar las paletas.</p>}
            {Object.keys(palettesColors).length > 0 && !errorPalettes && (
              <PalettesColor palettesColors={palettesColors.palettes} />
            )}
          </div>
        </div>
      </div>
    </ProtectedLogged>
  );
};

export default Page;
