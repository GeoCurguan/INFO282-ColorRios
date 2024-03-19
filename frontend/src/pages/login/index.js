import { useState } from "react";
import Image from "next/image";

import NavGoHome from "@/components/Navbar/NavGoHome";
import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";
import Spinner from "@/components/spinner/Spinner";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSwitchAction = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <>
      <NavGoHome />
      <Spinner isLoading={isLoading} />
      <div className="flex items-center justify-center">
        {/* Cascarón Login & Registro */}
        <div className="max-w-5xl flex flex-1 bg-white my-4 px-4">
          <div className="border bg-gray-100 px-16 py-12 max-w-md w-full ">
            <div>
              <img className="mx-auto w-auto h-20" src="/dashboard_icon.png" alt="Your Company" />
              <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {isRegistering ? "Regístrate" : "Iniciar Sesión"}
              </h2>
            </div>
            {/* Main Content Login & Registro*/}
            {isRegistering ? (
              <RegisterForm isLoading={isLoading} setIsLoading={setIsLoading} />
            ) : (
              <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
            )}
            {/* Register Switch*/}
            <RegisteringChanger isRegistering={isRegistering} handleSwitchAction={handleSwitchAction} />
          </div>

          {/* Imágen */}
          <div className="block flex-1 relative">
            <Image
              priority
              src="/images/auth/login-background.jpg"
              alt="Login background"
              fill
              sizes=" (max-width: 640px) 100vw, 640px"
              className="rounded-r-lg object-cover object-left"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const RegisteringChanger = ({ isRegistering, handleSwitchAction }) => {
  return (
    <p className="mt-10 text-center text-sm text-gray-500">
      {isRegistering ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}{" "}
      <button onClick={handleSwitchAction} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
        {isRegistering ? "Inicia sesión" : "Regístrate"}
      </button>
    </p>
  );
};

export default Login;
