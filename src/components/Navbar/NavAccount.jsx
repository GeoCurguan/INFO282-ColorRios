import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const NavAccount = ({ isActive }) => {
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  console.log(session);
  const activeClassLight = "bg-[#D9D9D9] text-[#434343] rounded-full";
  return (
    <ul className="py-4 px-8 gap-8 w-1/2 flex justify-evenly items-center">
      <li className={`px-4 py-2 ${isActive("/social") && activeClassLight}`}>
        <Link href="/social">Social</Link>
      </li>
      <button onClick={() => signOut()}>D</button>
      {session?.user.image ? (
        <Link href="/perfil">
          <Image
            alt={session?.user?.name || "User Image"}
            priority
            width={40}
            height={40}
            src={session?.user?.image || "/images/placeholder/user-placeholder.png"}
            className="cursor-pointer object-cover w-10 h-10 rounded-full"
          />
        </Link>
      ) : (
        <button className="px-4 py-2 rounded-full" onClick={() => signIn()}>
          Login
        </button>
      )}
    </ul>
  );
};

export default NavAccount;
