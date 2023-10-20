import { ArrowIcon } from "@/icons";
import DrawerForm from "./DrawerForm";

const Drawer = ({ openFilters, toggleFilters, filters, setFilters }) => {
  return (
    <>
      {openFilters ? (
        <DrawerInfo toggleFilters={toggleFilters} filters={filters} setFilters={setFilters} />
      ) : (
        <DrawerOpen toggleFilters={toggleFilters} />
      )}
    </>
  );
};

const DrawerInfo = ({ filters, setFilters, toggleFilters }) => {
  return (
    // ----- DrawerOverlay -----
    <div className="block fixed top-0 left-0 z-10">
      {/* ----- Drawer ----- */}
      <div className={`flex flex-col  items-center top-0 left-0 w-[300px] h-full fixed bg-gray-500 `}>
        {/* ----- Close button ----- */}
        <div className="w-full p-4 bg-gray-600 flex items-center justify-end h-10 text-white">
          <button
            onClick={() => {
              toggleFilters();
            }}
          >
            <ArrowIcon className="w-6 h-6 text-white transform  cursor-pointer" />
          </button>
        </div>
        {/* ----- Drawer Content ----- */}

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 flex flex-col items-center">
            {/* ----- Drawer Form ----- */}
            <DrawerForm filters={filters} setFilters={setFilters} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DrawerOpen = ({ toggleFilters }) => {
  return (
    <div
      className="hidden md:flex md:flex-col md:justify-center  md:fixed absolute top-1/2 left-0 w-8 h-10 bg-gray-900/50 transform -translate-y-1/2
    hover:bg-gray-900/70 cursor-pointer"
    >
      <ArrowIcon
        className="w-full h-full text-white transform rotate-180 transition-all hover:translate-x-1"
        onClick={() => toggleFilters()}
      />
    </div>
  );
};

export default Drawer;
