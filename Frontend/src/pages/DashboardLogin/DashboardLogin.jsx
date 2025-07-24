import axios from "axios";
import React, { useState, useEffect } from "react";
import { useUser } from "../../context/userContext";
export default function DashboardLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [base, setBase] = useState("");
  const [message, setMessage] = useState("");
  const roles = ["admin", "base_commander", "logistics_officer"];
  const bases = [
    "Delhi Base",
    "Chennai Base",
    "North-East Base",
    "Mumbai Base",
    "Kolkata Base",
  ];
  const { setUser } = useUser();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/api/auth/sign`;
      const response = await axios.post(
        url,
        { name, email, password, role, base },
        { withCredentials: true }
      );
      const data = response.data;
      console.log(data, "sign");

      if (response.status === 200 || response.status === 201) {
        setMessage(data.message);
        setName("");
        setEmail("");
        setPassword("");
        setRole("");
        setBase("");
        setCurrentPage("login");
      } else {
        setMessage(data.message || "Singup failed");
      }
    } catch (error) {
      console.error("Eorro during signup:", error);
      setMessage(
        error.response?.data?.message ||
          "An error occurred during singup. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/api/auth/login`;
      const response = await axios.post(
        url,
        { email, password },
        { withCredentials: true }
      );
      const data = response.data;
      console.log(data, "login");
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        setUser(data.userData);
        setIsLoggedIn(true);
        setMessage("Login successful!");

        if (data.url) {
          window.location.href = data.url;
        } else {
          setCurrentPage("dashboard");
          console.warn(
            "Backend did not provide a redirect URL. Navigating to default dashboard."
          );
        }
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage(
        error.response?.data?.message ||
          "An error occurred during login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
    setName("");
    setEmail("");
    setPassword("");
    setRole("Admin");
    setMessage("You have been logged out.");
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-inter p-4">
      {currentPage === "login" && (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Military Asset Management
          </h1>
          <p className="flex  justify-center m-4 font-semibold">
            Secure Access Portal
          </p>
          <form onSubmit={handleLogin} className="space-y-4 ">
            {/* Username Field */}
            <label
              className="block text-gray-700 text-sm font-medium "
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* Password Field */}
            <label
              className="block text-gray-700 text-sm font-medium "
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 text-center ${
                message.includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => {
                setCurrentPage("signup");
                setMessage("");
                setEmail("");
                setPassword("");
              }}
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </button>
          </p>
        </div>
      )}
      {currentPage === "signup" && (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Military Asset Management
          </h1>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Role
              </label>
              <select
                id="role"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select your role</option>
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r.charAt(0).toLowerCase() + r.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="base"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Base
              </label>
              <select
                id="role"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={base}
                onChange={(e) => setBase(e.target.value)}
                required
              >
                <option value="">Select your base</option>
                {bases.map((r) => (
                  <option key={r} value={r}>
                    {r.charAt(0).toLowerCase() + r.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          {message && (
            <p
              className={`mt-4 text-center ${
                message.includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => {
                setCurrentPage("login");
                setMessage("");
                setEmail("");
                setPassword("");
              }}
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </button>
          </p>
        </div>
      )}
      {currentPage === "dashboard" && isLoggedIn && (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Welcome to Your Dashboard!
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            You've successfully logged in. If you're not redirected, please
            contact support or check your account settings.
          </p>
          <button
            onClick={handleLogout}
            className="mt-8 bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
