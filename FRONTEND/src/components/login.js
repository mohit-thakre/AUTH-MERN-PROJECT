import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../helper";
import { context } from "../context/context";
import toast from "react-hot-toast";

const Login = () => {
  const { setIsLogin } = useContext(context);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${api}/singin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const data = await res.json();
      toast.error(data.message);
      setLoading(false);
      return;
    }

    const data = await res.json();
    localStorage.setItem("id", data.id);
    localStorage.setItem("email", data.email);
    localStorage.setItem("token", data.token);
    toast.success(data.message);
    setIsLogin(true);
    setLoading(false);
    navigate("/profile");
  };

  return (
    <div className="w-full h-[80vh] flex justify-center items-center bg-gray-50">
      <div className="w-1/3 p-6 bg-white rounded-lg shadow-md">
        <h1 className="font-bold text-2xl text-center mb-8 text-gray-800">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? "Please wait..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
