import React, { useState } from "react";
import { api } from "../helper";
import toast from "react-hot-toast";
const ResetPassword = () => {
  const url = `${api}/resetPassword`;

  const [loading, setloading] = useState(false);
  const [formData, setFormdata] = useState({
    password: "",
    confirmPassword: "",
    oldPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    if (!res.ok) {
      setloading(false);
      toast.error(result.message);
      return;
    }
    setFormdata(result);
    toast.success(result.message);
    setloading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full h-[80vh] flex justify-center items-center bg-gray-50">
      <div className="w-1/3 p-6 bg-white rounded-lg shadow-md">
        <h1 className="font-bold text-2xl text-center mb-8 text-gray-800">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Old Password:
            </label>
            <input
              required
              type="text"
              name="oldPassword"
              id="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              required
              type="text"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password :
            </label>
            <input
              required
              type="text"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
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

export default ResetPassword;
