import { useRouter } from "next/router";
import NavViews from "./NavViews";
import NavAccount from "./NavAccount";
import { useAuthContext } from "@/context/AuthContext";

const Nav = () => {
  const router = useRouter();
  const isActive = (pathname) => router.pathname === pathname;
  const { user, handleLogout, isAdmin } = useAuthContext();

  return (
    <header
      className="bg-[#434343] text-2xl"
      style={{
        background: "linear-gradient(145deg, #434343 100%)",
      }}
    >
      <nav className="flex justify-between items-center">
        {/* Section #1: Color views: Home, 3D */}
        <NavViews isActive={isActive} isAdmin={isAdmin} />
        {/* Section #2: Account content: Login, Social */}
        <NavAccount isActive={isActive} user={user} handleLogout={handleLogout} />
      </nav>
    </header>
  );
};

export default Nav;
