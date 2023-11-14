import { useRouter } from "next/router";
import NavViews from "./NavViews";
import NavAccount from "./NavAccount";

const Nav = () => {
  const router = useRouter();
  const isActive = (pathname) => router.pathname === pathname;

  return (
    <header
      className="bg-[#434343] text-2xl"
      style={{
        background: "linear-gradient(145deg, #434343 100%)",
      }}
    >
      <nav className="flex justify-between items-center text-[#D9D9D9]">
        {/* Section #1: Color views: Home, 3D */}
        <NavViews isActive={isActive} />
        {/* Section #2: Account content: Login, Social */}
        <NavAccount isActive={isActive} />
      </nav>
    </header>
  );
};

export default Nav;
