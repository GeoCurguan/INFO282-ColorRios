import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/router";

const LoginForm = () => {
    const router = useRouter();
    const [data, setData] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        // Validaciones
        if (username === "" || password === "") {
            toast.warning(
                "Debe completar todos los campos para iniciar sesión."
            );
            return;
        }

        // Petición a la API
        toast.info("Iniciando sesión...");

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            localStorage.setItem("token", data.token);
            toast.success(data.message);

            router.push("/");
        } catch (error) {
            toast.error("Error al iniciar sesión");
        }
    };

    return (
        <form className="mt-8 space-y-6" action="#" method="POST">
            <div>
                <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Nombre de usuario
                </label>
                <div className="mt-2">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Contraseña
                    </label>
                    {/* <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
        Olvidaste tu contraseña?
      </a>
          </div> */}
                </div>
                <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <button
                    type="button"
                    onClick={handleLogin}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Ingresar
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
