import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        data
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      router.push("/protected");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.msg ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-semibold mb-8 text-center text-blue-600">
          Login to Your Account
        </h2>
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("password", { required: true })}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:text-blue-800">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
}
