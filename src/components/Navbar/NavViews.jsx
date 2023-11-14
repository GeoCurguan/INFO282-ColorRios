import Link from "next/link";

const NavViews = ({ isActive }) => {
  const activeClassLight = "bg-[#D9D9D9] text-[#434343] rounded-full";

  const links = [
    {
      href: "/",
      label: "Galería",
    },
    {
      href: "/3d",
      label: "Espacio CieLab",
    },
  ];
  return (
    <ul className="py-4 px-8 gap-8 w-1/2 flex justify-evenly items-center text-[#D9D9D9]">
      {links.map((link) => (
        <li key={link.href} className={`px-4 py-2 ${isActive(link.href) && activeClassLight}`}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavViews;
