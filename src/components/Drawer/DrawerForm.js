import { useState, useEffect } from "react";
import { uniqueValuesFilters } from "@/utils";

const DrawerForm = ({ colors, filters, setFilters }) => {
  const [mounted, setMounted] = useState(false);
  const [valuesFilters, setValuesFilters] = useState({});

  useEffect(() => {
    setValuesFilters(uniqueValuesFilters(colors));
    setMounted(true);
  }, []);
  if (!mounted) return null;

  console.log(valuesFilters);

  return (
    <form className="flex flex-col items-center justify-center">
      {/* Filtrar por objeto: Todos, Roca, Vegetal ... */}
      <FilterObjeto valuesFilters={valuesFilters} filters={filters} setFilters={setFilters} />
      {/* Filtrar por comuna:  */}
      <FilterComuna valuesFilters={valuesFilters} filters={filters} setFilters={setFilters} />
    </form>
  );
};

const FilterObjeto = ({ valuesFilters, filters, setFilters }) => {
  return (
    <>
      <label htmlFor="objeto" className="text-white">
        Objeto
      </label>
      <select
        id="objeto"
        className="w-full h-10 bg-gray-900/50 text-white"
        name="objeto"
        onChange={(e) => {
          setFilters({ ...filters, [e.target.name]: e.target.value });
        }}
        value={filters.objeto}
      >
        <option value="todos">Todos</option>
        <option value="roca">Roca</option>
        <option value="vegetal">Vegetal</option>
        <option value="agua">Agua</option>
      </select>
    </>
  );
};

const FilterComuna = ({ valuesFilters, filters, setFilters }) => {
  return (
    <>
      <label htmlFor="comuna" className="text-white mt-4">
        Comuna
      </label>
      <select
        id="comuna"
        className="w-full h-10 bg-gray-900/50 text-white"
        name="comuna"
        onChange={(e) => {
          setFilters({ ...filters, [e.target.name]: e.target.value });
        }}
        value={filters.comuna}
      >
        <option value="todos">Todos</option>
        {valuesFilters.comunas.map((comuna) => (
          <option className="capitalize" key={comuna} value={comuna}>
            {comuna}
          </option>
        ))}
      </select>
    </>
  );
};

export default DrawerForm;
