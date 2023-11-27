import { Fragment, useEffect, useState } from "react";
import { regionesChile } from "@/constants/regionesChile";
import { toast } from "sonner";
import { useRouter } from "next/router";

import { useAuthContext } from "@/context/AuthContext";

const RegisterForm = ({ isLoading, setIsLoading }) => {
  const { handleLogin } = useAuthContext();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [job, setJob] = useState("Diseñador");
  const [image, setImage] = useState("");
  const [region, setRegion] = useState(regionesChile[0]?.region); // Arica y Parinacota
  const [commune, setCommune] = useState("");
  const [communesInRegion, setCommunesInRegion] = useState([]);
  const [gender, setGender] = useState("Masculino");

  useEffect(() => {
    const communesInRegion = regionesChile.filter((nregion) => {
      return nregion.region === region;
    });
    setCommunesInRegion(communesInRegion[0]?.comunas);
    setCommune(communesInRegion[0]?.comunas[0]);
  }, [region]);

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    // Validaciones
    if (
      username === "" ||
      password === "" ||
      confirmPassword === "" ||
      job === "" ||
      region === "" ||
      commune === "" ||
      gender === "" ||
      image === ""
    ) {
      toast.warning("Debe completar todos los campos para completar el registro.");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Las contraseñas no coinciden");
      return;
    }
    //console.log("Response Text:", await response.text());
    //Petición a la API
    toast.info("Registrando usuario...");
    setIsLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, job, region, commune, image, gender }),
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
        handleLogin(data.token);
        toast.success(data.message);
        router.push("/");
        return;
      }
    } catch (error) {
      toast.error("Error durante el registro");
    } finally {
      setIsLoading(false);
    }
    resetForm();
  };

  return (
    <>
      <form className="mt-8 space-y-6" onSubmit={handleRegister}>
        {/* Username */}
        <section>
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
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
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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
          <label htmlFor="job" className="block text-sm font-medium leading-6 text-gray-900">
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
          <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
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
                <option key={region.id} value={region.region}>
                  {region.region}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Comuna */}
        <section>
          <label htmlFor="comuna" className="block text-sm font-medium leading-6 text-gray-900">
            Comuna
          </label>
          <div className="mt-2">
            <select
              id="comuna"
              name="comuna"
              autoComplete="comuna"
              required
              value={commune}
              onChange={(e) => setCommune(e.target.value)}
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
            >
              {communesInRegion.map((commune) => (
                <option key={commune} value={commune}>
                  {commune}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Imagen */}
        <ChooseImage setImage={setImage} />

        {/* Gender */}
        <section>
          <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
            Género
          </label>
          <select
            id="gender"
            onChange={(e) => setGender(e.target.value)}
            className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </section>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Registrarme
          </button>
        </div>
      </form>
    </>
  );
};

const ChooseImage = ({ setImage }) => {
  const inputRadioOptions = [
    {
      id: "0",
      name: "color-gray",
      image: "#6b7280",
      className: "accent-gray-500",
    },
    {
      id: "1",
      name: "color-red",
      image: "#ef4444",
      className: "accent-red-500",
    },
    {
      id: "2",
      name: "color-blue",
      image: "#3b82f6",
      className: "accent-blue-500",
    },
    {
      id: "3",
      name: "color-green",
      image: "#22c55e",
      className: "accent-green-500",
    },
  ];
  return (
    <section>
      {/* input radio */}
      <legend htmlFor="opt-1" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
        Imagen
      </legend>
      <div className="flex items-center gap-2">
        {inputRadioOptions.map((option) => (
          <Fragment key={option.id}>
            <input
              id={option.id}
              name="image"
              type="radio"
              value={option.id}
              onChange={(e) => setImage(option.image)}
              className={`w-full h-8 ${option.className}`}
            />
            <label htmlFor={option.id} className="sr-only">
              {option.name}
            </label>
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default RegisterForm;
