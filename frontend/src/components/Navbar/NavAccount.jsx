import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const NavAccount = ({ isActive, user, handleLogout }) => {
  const [menu, setMenu] = useState(false);
  const activeClassDark = "bg-[#434343] text-[#D9D9D9] rounded-full";
  console.log(user?.username);
  return (
    <ul
      className={`justify-center ${
        user?.username ? "justify-end" : "w-full"
      } py-4 px-8 gap-2 md:gap-8 lg:w-1/2 flex items-center lg:justify-evenly`}
    >
      <li className={`${user?.username ? "hidden" : ""} lg:block px-4 py-2 ${isActive("/social") && activeClassDark}`}>
        <Link href="/social">Social</Link>
      </li>
      {user?.username ? (
        <li className="flex">
          <button onClick={() => setMenu(!menu)} className="w-10 h-10">
            <Image
              alt={`${user?.username} image` || "User Image"}
              priority
              width={40}
              height={40}
              src={user?.image || "/images/placeholder/user-placeholder.png"}
              className="cursor-pointer object-cover w-10 h-10 rounded-full border-2 border-[#434343]"
            />
          </button>

          {/* Mobile View */}
          {menu && <ExtraMenu handleLogout={handleLogout} isActive={isActive} />}
        </li>
      ) : (
        <li>
          <Link className="px-4 py-2 rounded-full" href={`/login`}>
            Login
          </Link>
        </li>
      )}
    </ul>
  );
};

const ExtraMenu = ({ isActive, handleLogout }) => {
  const [width, setWidth] = useState(0);

  // Si el width <= 1024px, entonces agregamos Social al menu
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  // Si width cambiara, entonces actualizamos el estado
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  const activeClassLightMobile = "bg-[#D9D9D9] text-[#434343]";

  return (
    <ul className="fade-in-down absolute top-16 right-0 z-10 bg-[#434343] rounded-b-md text-[#D9D9D9] w-[200px] shadow-sm transition-all test ease-in-out">
      {/* // Si el width <= 1024px, entonces agregamos Social al menu */}
      {width <= 1024 && (
        <li
          key="/social"
          className={`px-4 py-2 ${
            isActive("/social") && activeClassLightMobile
          } hover:bg-[#D9D9D9] hover:text-[#434343] transition-colors cursor-pointer`}
        >
          <Link href="/social">Social</Link>
        </li>
      )}

      <li
        key="/perfil"
        className={`px-4 py-2 ${
          isActive("/perfil") && activeClassLightMobile
        } hover:bg-[#D9D9D9] hover:text-[#434343] transition-colors cursor-pointer`}
      >
        <Link href="/perfil">Perfil</Link>
      </li>
      <li
        key="/logout"
        className={`px-4 py-2 hover:bg-[#D9D9D9] hover:text-[#434343] transition-colors cursor-pointer rounded-b-md`}
      >
        <button onClick={() => handleLogout()}>Logout</button>
      </li>
    </ul>
  );
};

export default NavAccount;
