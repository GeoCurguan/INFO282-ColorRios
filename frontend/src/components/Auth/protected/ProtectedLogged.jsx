import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";

// Se encarga de verificar si el usuario esta logueado
// Si no esta logueado, lo redirecciona a la pagina de login

const ProtectedLogged = ({ children }) => {
  const { auth } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth]);
  if (!auth) return null;

  return <>{children}</>;
};

export default ProtectedLogged;
