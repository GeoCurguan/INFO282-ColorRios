import { createContext, useState, useEffect, useContext } from "react";
import { useLocalStorage, useLocalStorageJSON } from "@/hooks/useLocalStorage";
import { decodeToken } from "@/utils/auth";
import { useRouter } from "next/router";

const MyAuthContext = createContext();

export const AuthContext = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useLocalStorageJSON("user-data", {});
  const [auth, setAuth] = useLocalStorage("token", "");
  const [mounted, setMounted] = useState(false);
  const isAdmin = user?.roles?.includes("ROLE_ADMIN") || false;

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      // Si el usuario tiene datos, entonces ya está logueado
      // Revisamos la integridad de del token (si expiró): "exp"
      console.log(user);
      if (user.exp < Date.now() / 1000) {
        // El token expiró
        console.log("El token expiró");
        handleLogout();
      }
    }
    setMounted(true);
  }, []);

  const handleLogin = async (token) => {
    setAuth(token);
    localStorage.setItem("token", token);
    // Obtener los datos del usuario desde el servidor o bien desencriptar acá
    const decodedToken = decodeToken(token);
    console.log(decodedToken);
    setUser(decodedToken);
  };

  const handleLogout = () => {
    setAuth("");
    setUser({});
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
