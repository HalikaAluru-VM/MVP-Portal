import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import SearchBar from "../components/SearchBar";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Reset button (always shown)
  const ResetButton = () => (
    <div className=" absolute  right-4 top-6 group ">
      <button
        onClick={() => navigate("/")}
        className="p-2 rounded-full hover:bg-gray-800 transition-colors"
        style={{ outline: "none", border: "none", background: "none", cursor: "pointer" }}
      >
        <RotateCcw className="w-6 h-6 text-gray-300 group-hover:text-gray-500" />
      </button>
      <span className="absolute right-0 top-10 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-opacity pointer-events-none whitespace-nowrap z-20">
        Back
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans relative">
      {/* VMlogo top left globally */}
      <div className="fixed top-4 left-4 z-50">
        <img src="/VMlogo.png" alt="VMlogo" className="w-32" />
      </div>
      {/* Background image for all pages */}
      <div className="fixed inset-0 -z-10 w-full h-full bg-no-repeat bg-center bg-cover" style={{ backgroundImage: "url('/src/assets/bg.png')" }}></div>
      {/* Reset button top right */}
      <ResetButton />

      {/* For all pages except dashboard → show centered SearchBar */}
      {location.pathname !== "/" && (
        <div className="flex justify-center  px-4">
          <div className="w-full max-w-lg mt-10">
            <SearchBar placeholder="Search..." />
          </div>
        </div>
      )}

      {/* Page content */}
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
