import Link from "next/link";
const NavGoHome = () => {
  return (
    <nav className="flex justify-between items-center w-full text-2xl ">
      <Link
        href="/"
        className=" bg-[#D9D9D9] text-[#434343] rounded-br-md hover:bg-[#434343] hover:text-[#D9D9D9] transition duration-300 ease-in-out px-4 py-6 "
      >
        Volver al Inicio
      </Link>
    </nav>
  );
};

export default NavGoHome;
