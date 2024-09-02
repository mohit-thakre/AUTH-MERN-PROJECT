import React, { useContext } from "react";
import { context } from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Nav = () => {
  const navigate = useNavigate();
  const { isLogin, logout } = useContext(context);

  const handleLogout = () => {
    logout();
    toast.success("Logout successful");
    navigate("/login");
  };

  return (
    <div className="bg-white border-b border-gray-300 py-4 md:py-6">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          <Link to="/">Welcome To UserAuth</Link>
        </h1>
        <div className="w-full flex justify-center items-center gap-4">
          <button
            className="px-4 py-2 border-2 border-gray-300 font-extrabold rounded-lg text-gray-800 hover:bg-gray-100 transition duration-150"
            onClick={isLogin ? handleLogout : undefined}
          >
            {isLogin ? "Logout" : <Link to="/login">Login</Link>}
          </button>
          <button className="px-4 py-2 border-2 border-gray-300 font-extrabold rounded-lg text-gray-800 hover:bg-gray-100 transition duration-150">
            {isLogin ? (
              <Link to="/profile">Profile</Link>
            ) : (
              <Link to="/signup">Signup</Link>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
