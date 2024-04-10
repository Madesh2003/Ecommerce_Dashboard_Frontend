import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from ".././contexts/AuthContext";
import { setSessionStorageData } from ".././Storage/Sessionstorage";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8000/user/signin", { email, password })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          setSessionStorageData("token", response.data.token);
          navigate("/dashboard");
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 401) {
            toast.error(data.message);
          } else if (status === 402) {
            toast.error(data.message);
          } else {
            toast.error("An unexpected error occurred.");
          }
        } else {
          toast.error("Network error. Please try again later.");
        }
        console.log(error)
      });
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full h-full banner">
      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-clip-padding backdrop-filter bg-opacity-5 bg-white backdrop-blur-xl shadow-md sm:max-w-lg sm:rounded-lg">
        <form onSubmit={handleLogin}>
          <div className="mt-4">
            <div className="text-center text-white mb-2">
              <p>Email: example1@gmail.com</p>
              <p>Password: password</p>
            </div>
            <label
              htmlFor="email"
              className="block text-sm font-medium tracking-wider uppercase text-white"
            >
              Email
            </label>
            <div className="flex flex-col items-start">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium uppercase tracking-wide text-white"
            >
              Password
            </label>
            <div className="flex flex-col items-start">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-700 transform bg-black rounded-md hover:bg-white uppercase hover:text-black focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
        {/* <div className="mt-4 text-white  tracking-wide">
          Create a new account{" "}
          <span>
            <Link to="/signup" className="text-black hover:underline">
              SignUp
            </Link>
          </span>
        </div> */}
      </div>
      <ToastContainer />
    </div>
  );
}
