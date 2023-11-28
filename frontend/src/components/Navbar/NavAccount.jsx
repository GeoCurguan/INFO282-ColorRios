import Image from "next/image";
import Link from "next/link";

const NavAccount = ({ isActive, user }) => {
  console.log("user", user);
  const activeClassDark = "bg-[#434343] text-[#D9D9D9] rounded-full";
  return (
    <ul className="py-4 px-8 gap-8 w-1/2 flex justify-evenly items-center">
      <li className={`px-4 py-2 ${isActive("/social") && activeClassDark}`}>
        <Link href="/social">Social</Link>
      </li>
      {user ? (
        <Link href="/perfil">
          {/* <Image
            // alt={session?.user?.name || "User Image"}
            priority
            width={40}
            height={40}
            // src={session?.user?.image || "/images/placeholder/user-placeholder.png"}
            className="cursor-pointer object-cover w-10 h-10 rounded-full"
          /> */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-t from-red-500 to-yellow-500 border-2 border-[#434343]"></div>
        </Link>
      ) : (
        <Link className="px-4 py-2 rounded-full" href={`/login`}>
          Login
        </Link>
      )}
    </ul>
  );
};

export default NavAccount;
