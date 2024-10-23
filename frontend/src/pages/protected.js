import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Protected() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      axios
        .get("http://localhost:5000/auth/me", {
          headers: {
            "x-auth-token": token,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("token");
          router.push("/login");
        });
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg text-gray-600 font-semibold">
          Loading user data...
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-8">
          Protected Page
        </h2>
        <p className="text-lg text-gray-700 text-center">
          Welcome,{" "}
          <span className="font-semibold text-indigo-500">{user.username}</span>
          !
        </p>
        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
