import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const NavAccount = ({ isActive }) => {
  const { data: session } = useSession();
  console.log(session);
  const activeClassDark = "bg-[#434343] text-[#D9D9D9] rounded-full";
  return (
    <ul className="py-4 px-8 gap-8 w-1/2 flex justify-evenly items-center">
      <li className={`px-4 py-2 ${isActive("/social") && activeClassDark}`}>
        <Link href="/social">Social</Link>
      </li>
      {session?.image ? (
        <button className="px-4 py-2 rounded-full" onClick={() => signIn()}>
          Login
        </button>
      ) : (
        <Link href="/perfil">
          <Image
            alt={session?.user?.name || "User Image"}
            priority
            width={40}
            height={40}
            src={session?.user?.image || "/placeholder/user-placeholder.png"}
            className="cursor-pointer object-cover w-10 h-10 rounded-full"
          />
        </Link>
      )}
    </ul>
  );
};

export default NavAccount;
