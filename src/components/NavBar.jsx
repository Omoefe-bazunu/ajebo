import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { PiDressFill } from "react-icons/pi";
import { IoFastFood } from "react-icons/io5";
import {
  HomeIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { CartContext } from "../contexts/CartContext";

const Navbar = () => {
  const { user } = useContext(AppContext);
  const { handleLogout } = useContext(CartContext);
  const { cart } = useContext(CartContext);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const getLinkClass = ({ isActive }) =>
    `flex items-center justify-center w-12 border border-gray-100 h-12 rounded-full transition-all duration-300 ${
      isActive
        ? "text-coral-pink bg-white/30 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)]"
        : "text-dark-slate hover:text-coral-pink hover:bg-white/20 hover:shadow-[2px_2px_5px_rgba(0,0,0,0.1)]"
    }`;

  return (
    <nav className="fixed top-0 w-full bg-white backdrop-blur-md text-dark-slate shadow-[0_4px_10px_rgba(0,0,0,0.05)] z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo Section */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-coral-pink"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          AjeboRush
        </NavLink>

        {/* Navigation Links */}
        <div className="flex items-center space-x-2">
          <NavLink
            to="/"
            className={getLinkClass}
            aria-label="Home"
            title="Home"
          >
            <HomeIcon className="w-6 h-6" />
          </NavLink>
          <NavLink
            to="/catering"
            className={getLinkClass}
            aria-label="Catering"
            title="Catering"
          >
            <IoFastFood className="w-6 h-6" />
          </NavLink>
          <NavLink
            to="/fashion"
            className={getLinkClass}
            aria-label="Fashion"
            title="Fashion"
          >
            <PiDressFill className="w-6 h-6" />
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative flex items-center justify-center w-12 border border-gray-100 h-12 rounded-full transition-all duration-300 ${
                isActive
                  ? "text-coral-pink bg-white/30 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)]"
                  : "text-dark-slate hover:text-coral-pink hover:bg-white/20 hover:shadow-[2px_2px_5px_rgba(0,0,0,0.1)]"
              }`
            }
            aria-label="Cart"
            title="Cart"
          >
            <ShoppingCartIcon className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full shadow">
                {itemCount}
              </span>
            )}
          </NavLink>
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center cursor-pointer justify-center w-12 h-12 rounded-full text-dark-slate hover:text-coral-pink hover:bg-white/20 hover:shadow-[2px_2px_5px_rgba(0,0,0,0.1)] transition-all duration-300"
              aria-label="Logout"
              title="Logout"
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
            </button>
          ) : (
            <NavLink
              to="/signup"
              className={getLinkClass}
              aria-label="Login"
              title="Login"
            >
              <UserCircleIcon className="w-6 h-6" />
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
