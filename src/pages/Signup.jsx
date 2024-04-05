import React, { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from ".././contexts/AuthContext";
import { setSessionStorageData } from ".././Storage/Sessionstorage";


export default function Signup() {
    const { setLoggedIn } = useContext(AuthContext);


    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [email, setEmail] = useState()
    const [phonenumber, setPhonenumber] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate()

  
    function handleSignup(event) {
        
        event.preventDefault();
        axios.post("http://localhost:8000/user/create",{firstname, lastname, email, phonenumber, password})
        .then((res) => {
            if(res.status === 200){
                setLoggedIn(true);
                setSessionStorageData("_tk", res.data.token);
                navigate("/dashboard")
            }
        })
        .catch((err) => {
            alert('Error')
        }
        
        )
    }


    return (
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                    <form onSubmit={handleSignup}>
                        <div>
                            <label
                                htmlFor="firstname"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                               First Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                onChange={(e) => setFirstname(e.target.value)}
                                    type="text"
                                    id="firstname"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="lastname"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Last Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                onChange={(e) => setLastname(e.target.value)}
                                    type="text"
                                    id="lastname"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    id="email"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="phonenumber"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                               PhoneNumber
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                onChange={(e) => setPhonenumber(e.target.value)}
                                    type="number"
                                    id="phonenumber"
                                    maxLength="10"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    name="password_confirmation"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                                             <div className="flex items-center mt-4">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-700 transform bg-brand-bg rounded-md hover:bg-black focus:outline-none">
                               Signup
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-grey-600">
                        Already have an account?{" "}
                        <span>
                          <Link to='/'>
                         
                          </Link>
                        </span>
                    </div>
                  </div>
            </div>
    );
}