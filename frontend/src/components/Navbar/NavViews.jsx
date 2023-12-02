import { useState } from "react";
import Link from "next/link";
import { adminLinks, userLinks } from "./links";
import { MenuIcon } from "@/icons";

const NavViews = ({ isActive, isAdmin }) => {
  const [menu, setMenu] = useState(false);
  const activeClassLight = "bg-[#D9D9D9] text-[#434343] rounded-full";
  const activeClassLightMobile = "bg-[#D9D9D9] text-[#434343]";
  const links = isAdmin ? adminLinks : userLinks;

  return (
    // Desktop View
    <>
      <ul className="hidden lg:flex py-4 px-8 gap-8 w-1/2 justify-evenly items-center text-[#D9D9D9]">
        {links.map((link) => (
          <li key={link.href} className={`px-4 py-2 ${isActive(link.href) && activeClassLight}`}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      {/* Mobile View */}
      <div className="lg:hidden flex flex-row justify-between items-center w-full px-8">
        <div className="flex flex-row justify-center items-center gap-4">
          <MenuIcon className="w-8 h-8 cursor-pointer fill-[#D9D9D9]" onClick={() => setMenu(!menu)} />
          {menu && (
            <ul className="fade-in-down absolute top-16 left-0 z-10 bg-[#434343] rounded-b-md text-[#D9D9D9] w-[200px] shadow-sm transition-all test ease-in-out">
              {links.map((link, index) => {
                // If it's the last element, add a round
                if (index === links.length - 1) {
                  return (
                    <li
                      key={link.href}
                      className={`px-4 py-2 ${
                        isActive(link.href) && activeClassLightMobile
                      } hover:bg-[#D9D9D9] hover:text-[#434343] transition-colors cursor-pointer rounded-b-md`}
                      onClick={() => setMenu(false)}
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  );
                }

                return (
                  <li
                    key={link.href}
                    className={`px-4 py-2 ${
                      isActive(link.href) && activeClassLightMobile
                    } hover:bg-[#D9D9D9] hover:text-[#434343] transition-colors cursor-pointer`}
                    onClick={() => setMenu(false)}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default NavViews;
