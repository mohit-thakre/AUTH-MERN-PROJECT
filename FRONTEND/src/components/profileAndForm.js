import React, { useContext, useEffect, useState } from "react";
import { api } from "../helper";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { context } from "../context/context";

const ProfileAndForm = () => {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const { logout } = useContext(context);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${api}/getuser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          console.error("Error while fetching details");
          return;
        }

        const result = await res.json();
        setData(result.data);
        console.log(result.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return (
      <h1 className="text-center font-extrabold text-3xl flex w-full h-[80vh] justify-center items-center">
        No form data found
      </h1>
    );
  }

  const handleProfileDelete = async () => {
    try {
      const res = await fetch(`${api}/deleteProfile`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        logout();
        navigate("/");
      } else {
        toast.error("Error deleting profile");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Profile Details
        </h1>
        <div className="mb-4 flex justify-center items-center ">
          <img
            className="rounded-3xl"
            src={`https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}`}
            alt="/"
          ></img>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700 bg-green-50 px-4 py-2 rounded-md">
            <span className="font-bold">Username:</span> {data.userName}
          </h2>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700 bg-green-50 px-4 py-2 rounded-md">
            <span className="font-bold">Name:</span> {data.firstName}{" "}
            {data.lastName}
          </h2>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700 bg-green-50 px-4 py-2 rounded-md">
            <span className="font-bold">Email:</span> {data.email}
          </h2>
        </div>
        <div className="flex justify-between mt-6 gap-5">
          <button className="px-6 py-2 w-full border-2 border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-100 transition duration-150">
            <Link to="/updateProfile">Update Profile</Link>
          </button>
          <button className="px-6 py-2 w-full border-2 border-green-500 text-green-500 font-semibold rounded-lg hover:bg-green-100 transition duration-150">
            <Link to="/resetPassword">Update/Reset Password</Link>
          </button>
        </div>
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={handleProfileDelete}
            className="px-6 py-2 border-2 w-[60%] border-red-500 text-red-500 font-semibold rounded-lg hover:bg-red-100 transition duration-150"
          >
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileAndForm;
