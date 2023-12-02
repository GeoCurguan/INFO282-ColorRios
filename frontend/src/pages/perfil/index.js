import { useAuthContext } from "@/context/AuthContext";

import ProtectedLogged from "@/components/Auth/protected/ProtectedLogged";
import Nav from "@/components/Navbar/Nav";
import ProfileCard from "@/components/profile/ProfileCard";

const Page = () => {
  // TOOD: PERFIL - RUTA PROTEGIDA
  const { user, handleLogout } = useAuthContext();
  return (
    <ProtectedLogged>
      <Nav />
      <div className="mt-8 flex flex-col flex-wrap justify-center items-center">
        <ProfileCard user={user} />
      </div>
      <div className="flex justify-center items-center">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-8"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </ProtectedLogged>
  );
};

export default Page;
