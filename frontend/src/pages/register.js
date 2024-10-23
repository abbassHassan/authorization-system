import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setError(null);
    try {
      await axios.post("http://localhost:5000/auth/register", data);
      window.location.href = "/login";
    } catch (error) {
      setError(error.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-semibold mb-8 text-center text-green-600">
          Create a New Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              {...register("username", { required: true })}
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              {...register("password", { required: true })}
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:text-green-800">
            Login here
          </a>
        </div>
      </div>
    </div>
  );
}
