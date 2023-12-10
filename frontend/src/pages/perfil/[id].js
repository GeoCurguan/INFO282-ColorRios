import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// Components
import ProtectedLogged from "@/components/Auth/protected/ProtectedLogged";
import Nav from "@/components/Navbar/Nav";
import ProfileCard from "@/components/profile/ProfileCard";
import Spinner from "@/components/spinner/Spinner";
import PalettesColor from "@/components/PalettesColor/PalettesColors";

const PerfilID = () => {
  const [user, setUser] = useState({});
  const [palettesColors, setPalettesColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorPalettes, setErrorPalettes] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const userNotEmpty = Object.keys(user).length !== 0;

  useEffect(() => {
    if (!id) {
      return;
    }
    const getUser = async () => {
      try {
        const response = await fetch(`/api/getUser/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setError("No se pudo cargar la información.");
        }
      } catch (error) {
        setError("Algo inesperado ocurrió.");
      }
      setLoading(false);
    };
    getUser();
  }, [id]);

  useEffect(() => {
    if (!id && userNotEmpty) {
      return;
    }
    // Si tenemos el usuario (data) podemos solicitar sus paletas de color
    const getPalettesColor = async () => {
      try {
        const { username } = user;
        const response = await fetch(`/api/getPalettes/${username}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPalettesColors(data);
        } else {
          setErrorPalettes("No se pudo cargar la información.");
        }
      } catch (error) {
        setErrorPalettes("Algo inesperado ocurrió.");
      }
      setLoading(false);
    };
    getPalettesColor();
  }, [user]);

  return (
    <ProtectedLogged>
      <Nav />

      <div className="mt-8 flex flex-col flex-wrap justify-center items-center">
        {loading && <Spinner isLoading={loading} />}
        {error && <p className="mb-8 text-gray-800 text-xl">{error}</p>}
        {userNotEmpty && !error && <ProfileCard user={user} />}
        {errorPalettes && <p className="mb-8 text-gray-800 text-xl">{errorPalettes}</p>}
        {Object.keys(palettesColors).length > 0 && !errorPalettes && (
          <PalettesColor palettesColors={palettesColors.palettes} />
        )}
      </div>
    </ProtectedLogged>
  );
};

export default PerfilID;
