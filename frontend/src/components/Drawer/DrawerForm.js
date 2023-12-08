import { useState, useEffect } from "react";
import { uniqueValuesFilters } from "@/utils";
import { colors } from "@/constants/colors";

const DrawerForm = ({ colors, filters, setFilters }) => {
  const [mounted, setMounted] = useState(false);
  const [valuesFilters, setValuesFilters] = useState({});

  useEffect(() => {
    setValuesFilters(uniqueValuesFilters(colors)); // unique values: { comunas: [], estaciones: [] }
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <form className="flex flex-col items-center justify-center">
      {/* Filtrar por objeto: Todos, Roca, Vegetal ... */}
      <FilterObjeto valuesFilters={valuesFilters} filters={filters} setFilters={setFilters} />
      {/* Filtrar por comuna:  */}
      <FilterComuna valuesFilters={valuesFilters} filters={filters} setFilters={setFilters} />
      {/* Filtrar por estación del año:  */}
      <FilterEstacion filters={filters} setFilters={setFilters} />
      {/* Filtrar por color:  */}
      <FilterColor valuesFilters={valuesFilters} filters={filters} setFilters={setFilters} />
    </form>
  );
};

// Los Filtros de Objeto son fijos
// - Todos, Roca, Suelo, Planta, Vegetación, Agua, Cielo
const FilterObjeto = ({ valuesFilters, filters, setFilters }) => {
  return (
    <>
      <label htmlFor="objeto" className="text-white">
        Objeto
      </label>
      <select
        id="objeto"
        className="w-full h-10 bg-gray-900/50 text-white capitalize"
        name="objeto"
        onChange={(e) => {
          setFilters({ ...filters, [e.target.name]: e.target.value });
        }}
        value={filters.objeto}
      >
        <option value="todos">Todos</option>
        {valuesFilters.objetos.map((objeto) => (
          <option className="capitalize" key={objeto} value={objeto}>
            {objeto}
          </option>
        ))}
      </select>
    </>
  );
};

// Los Filtros por comuna son dinámicos
const FilterComuna = ({ valuesFilters, filters, setFilters }) => {
  return (
    <>
      <label htmlFor="comuna" className="text-white mt-4">
        Comuna
      </label>
      <select
        id="comuna"
        className="w-full h-10 bg-gray-900/50 text-white capitalize"
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

// Los Filtros por estación son fijos
// - Todos, Primavera, Verano, Otoño, Invierno
const FilterEstacion = ({ filters, setFilters }) => {
  return (
    <>
      <label htmlFor="estacion" className="text-white mt-4">
        Estación del año
      </label>
      <select
        id="estacion"
        className="w-full h-10 bg-gray-900/50 text-white"
        name="estacion"
        onChange={(e) => {
          setFilters({ ...filters, [e.target.name]: e.target.value });
        }}
        value={filters.estacion}
      >
        <option value="todos">Todos</option>
        <option value="primavera">Primavera</option>
        <option value="verano">Verano</option>
        <option value="otoño">Otoño</option>
        <option value="invierno">Invierno</option>
      </select>
    </>
  );
};

// Los filtros por color son fijos
// constants/colors.js

const FilterColor = ({ valuesFilters, filters, setFilters }) => {
  return (
    <>
      <label htmlFor="color" className="text-white mt-4">
        Color
      </label>
      <select
        id="color"
        className="w-full h-10 bg-gray-900/50 text-white capitalize"
        name="color"
        onChange={(e) => {
          setFilters({ ...filters, [e.target.name]: e.target.value });
        }}
        value={filters.color}
      >
        <option value="todos">Todos</option>
        {valuesFilters.colores.map((color) => (
          <option className="capitalize" key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
    </>
  );
};

export default DrawerForm;
