import { useAuthContext } from "@/context/AuthContext";

import ProtectedLogged from "@/components/Auth/protected/ProtectedLogged";
import Nav from "@/components/Navbar/Nav";
import ProfileCard from "@/components/profile/ProfileCard";

const Page = () => {
  // TOOD: PERFIL - RUTA PROTEGIDA
  const { user } = useAuthContext();
  return (
    <ProtectedLogged>
      <Nav />
      <div className="mt-8 flex flex-col flex-wrap justify-center items-center">
        <ProfileCard user={user} />
      </div>
    </ProtectedLogged>
  );
};

export default Page;
