import ProtectedLogged from "@/components/Auth/protected/ProtectedLoggin";
import Nav from "@/components/Navbar/Nav";
import { useAuthContext } from "@/context/AuthContext";

const Page = () => {
  // TOOD: PERFIL - RUTA PROTEGIDA
  const { handleLogout } = useAuthContext();
  return (
    <ProtectedLogged>
      <Nav />
      <div className="flex flex-col min-h-screen flex-wrap justify-center items-center">
        <h1>Perfil</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </ProtectedLogged>
  );
};

export default Page;
