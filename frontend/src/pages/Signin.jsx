import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_API_ENDPOINT_URL_DEV } from "../utils/app.constants";
import { AuthContext } from "../context/AuthContext";

export default function Signin() {
  const { isAuthenticated, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const baseURL =
    process.env.REACT_APP_BACKEND_API_ENDPOINT_URL ||
    BACKEND_API_ENDPOINT_URL_DEV;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseURL}signin`, {
        email,
        password,
      });
      login(response.data.token, () => {
        toast.success(response.data.message);
        navigate("/");
      });
    } catch (error) {
      toast.error(`Login failed: ${error.response.data.message}`);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link className="text-blue-500 hover:underline" to={"/signup"}>
            Signup
          </Link>
        </p>
        <div className="mt-4">
          <button className="w-full bg-white text-gray-700 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-300 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
              <path fill="none" d="M1 1h22v22H1z" />
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}
