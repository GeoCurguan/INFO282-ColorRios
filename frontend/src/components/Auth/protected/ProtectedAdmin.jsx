import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";

const ProtectedAdmin = ({ children }) => {
  const { auth, user, isAdmin } = useAuthContext();
  const router = useRouter();

  //
  useEffect(() => {
    if (!auth || !isAdmin) {
      router.push("/login");
    }
  }, [auth, isAdmin]);
  if (!auth || !isAdmin) return null;

  return <>{children}</>;
};

export default ProtectedAdmin;
