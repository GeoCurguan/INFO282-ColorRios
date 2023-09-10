import { ArrowIcon } from "@/pages/icons";
import { useState, useEffect } from "react";

const Drawer = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleClose = (e) => {
    console.log(e.target.id);
    if (e.target.id === "drawer-overlay" || e.target.id === "drawer-close") {
      setIsDrawerOpen(false);
    }
  };

  return (
    <>
      {isDrawerOpen ? (
        // ----- DrawerOverlay -----
        <div
          onClick={handleClose}
          id="drawer-overlay"
          className="hidden md:block md:fixed top-0 left-0 w-full h-full bg-gray-900/10 z-10  backdrop-filter backdrop-blur-[2px]"
        >
          {/* ----- Drawer ----- */}
          <div className="hidden md:flex md:flex-col md:fixed absolute top-0 left-0 w-64 h-full bg-gray-900/50">
            {/* ----- Close button ----- */}

            <div className="p-4 bg-gray-900/50 flex items-center justify-end h-10 text-white">
              <ArrowIcon
                id="drawer-close"
                className="w-6 h-6 text-white transform  cursor-pointer"
                onClick={handleClose}
              />
            </div>
            {/* ----- Drawer Content ----- */}

            <div className="flex-1 overflow-y-auto">
              <div className="p-4 flex flex-col items-center">{children}</div>
            </div>
          </div>
        </div>
      ) : (
        // Arrow in the middle
        <div
          className="hidden md:flex md:flex-col md:justify-center  md:fixed absolute top-1/2 left-0 w-8 h-10 bg-gray-900/50 transform -translate-y-1/2
          hover:bg-gray-900/70 cursor-pointer"
        >
          <ArrowIcon
            className="w-full h-full text-white transform rotate-180 transition-all hover:translate-x-1"
            onClick={() => setIsDrawerOpen(true)}
          />
        </div>
      )}
    </>
  );
};

export default Drawer;
