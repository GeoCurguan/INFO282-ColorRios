import { createContext, useState, useEffect, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { decodeToken } from "@/utils/auth";

const MyAuthContext = createContext();

export const AuthContext = ({ children }) => {
  const [user, setUser] = useLocalStorage("user-data", {});
  const [auth, setAuth] = useLocalStorage("token", "");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("user-data", JSON.stringify(user));
  }, [user]);

  const handleLogin = async (token) => {
    setAuth(token);
    localStorage.setItem("token", token);
    const decodedToken = decodeToken(token);
    setUser(decodedToken);
    console.log(decodedToken);
    // TODO:
    // Obtener los datos del usuario desde el servidor o bien desencriptar acá
  };

  const handleLogout = () => {
    setAuth("");
    localStorage.removeItem("token");
    localStorage.removeItem("user-data");
  };

  return mounted ? (
    <MyAuthContext.Provider
      value={{
        auth,
        user,
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
