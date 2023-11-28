import { useState } from "react";
import { regionesChile } from "@/constants/regionesChile";
import { toast } from "sonner";
import { useRouter } from "next/router";

const RegisterForm = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [job, setJob] = useState("");
    const [image, setImage] = useState("");
    const [region, setRegion] = useState("");
    const [gender, setGender] = useState("");

    const resetForm = () => {
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setJob("");
        setImage("");
        setRegion("");
        setGender("");
    };

    const handleRegister = async () => {
        // Validaciones
        if (
            username === "" ||
            password === "" ||
            confirmPassword === "" ||
            job === "" ||
            region === ""
        ) {
            toast.warning(
                "Debe completar todos los campos para completar el registro."
            );
            return;
        }

        if (password !== confirmPassword) {
            toast.warning("Las contraseñas no coinciden");
            return;
        }
        //console.log("Response Text:", await response.text());

        //Petición a la API
        toast.info("Registrando usuario...");
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, job, region }),
            });
            console.log("Response:", response);
            if (!response.ok) {
                // Manejar el caso cuando response.ok es false (código de estado fuera del rango 200-299)
                const errorMessage = await response.json();
                toast.error(errorMessage.message);
                return;
            }
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                toast.success(data.message);
                router.push("/");
                return;
            }
        } catch (error) {
            toast.error("Error durante el registro");
        }
    };

    return (
        <form className="mt-8 space-y-6" action="#" method="POST">
            {/* Username */}
            <section>
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
                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                    />
                </div>
            </section>

            {/* Password & Confirm-password */}
            <section className="flex flex-row gap-2 items-end">
                <div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Contraseña
                        </label>
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
                            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                        />
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="confirm-password"
                            className="text-center block text-sm font-medium leading-6 text-gray-900"
                        >
                            Confirmar Contraseña
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                        />
                    </div>
                </div>
            </section>

            {/* Job */}
            <section>
                <label
                    htmlFor="job"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Trabajo
                </label>
                <div className="mt-2">
                    <select
                        id="job"
                        name="job"
                        autoComplete="job"
                        required
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                    >
                        <option value="Diseñador">Diseñador</option>
                        <option value="Artista">Artista</option>
                        <option value="Profesor">Profesor</option>
                        <option value="Estudiante">Estudiante</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
            </section>

            {/* Region */}
            <section>
                <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Región
                </label>
                <div className="mt-2">
                    <select
                        id="region"
                        name="region"
                        autoComplete="region"
                        required
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                    >
                        {regionesChile.map((region) => (
                            <option key={region.id} value={region.nombre}>
                                {region.nombre}
                            </option>
                        ))}
                    </select>
                </div>
            </section>

            <div>
                <button
                    type="button"
                    onClick={handleRegister}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Registrarme
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;
