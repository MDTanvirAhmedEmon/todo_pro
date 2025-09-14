import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";
import type { IlogInUser } from "../global/todoType";

const MainLayout = () => {
  const user = useSelector((state: IlogInUser) => state.logInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state for dark mode
  const [darkMode, setDarkMode] = useState(false);

  const handleLogOut = () => {
    dispatch(setUser({ user: null, token: null }));
    navigate(`/login`);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      data-theme={darkMode ? "dark" : "light"}
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <header
        className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold">Todo Pro</h1>

            <div className="flex items-center space-x-4">
              <span className="text-sm hidden sm:inline">
                Welcome, {user?.user?.name}
              </span>

              {/* Beautiful Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`relative w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none cursor-pointer ${
                  darkMode ? "bg-purple-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                    darkMode ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>

              <button
                onClick={handleLogOut}
                className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm hover:bg-purple-700 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
};

export default MainLayout;
