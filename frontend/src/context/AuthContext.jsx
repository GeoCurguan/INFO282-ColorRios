import { createContext, useState, useEffect, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { decodeToken } from "@/utils/auth";
import { useRouter } from "next/router";

const MyAuthContext = createContext();

export const AuthContext = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useLocalStorage("user-data", {});
  const [auth, setAuth] = useLocalStorage("token", "");
  const [mounted, setMounted] = useState(false);
  const isAdmin = user?.roles?.includes("ROLE_ADMIN") || false;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (token) => {
    setAuth(token);
    localStorage.setItem("token", token);
    // Obtener los datos del usuario desde el servidor o bien desencriptar acá
    const decodedToken = decodeToken(token);
    setUser(decodedToken);
  };

  const handleLogout = () => {
    setAuth("");
    localStorage.removeItem("token");
    localStorage.removeItem("user-data");
    router.reload();
  };

  return mounted ? (
    <MyAuthContext.Provider
      value={{
        auth,
        user,
        isAdmin,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </MyAuthContext.Provider>
  ) : null;
};

export const useAuthContext = () => {
  return useContext(MyAuthContext);
};
