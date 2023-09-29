import React from "react";

const DrawerForm = ({ filters, setFilters }) => {
  return (
    <form className="flex flex-col items-center justify-center">
      <label htmlFor="objeto" className="text-white">
        Objeto
      </label>
      <select
        id="objeto"
        className="w-full h-10 bg-gray-900/50 text-white"
        name="objeto"
        onChange={(e) => {
          setFilters({ ...setFilters, [e.target.name]: e.target.value });
        }}
        value={filters.objeto}
      >
        <option value="todos">Todos</option>
        <option value="roca">Roca</option>
        <option value="vegetal">vegetal</option>
      </select>
    </form>
  );
};

export default DrawerForm;
