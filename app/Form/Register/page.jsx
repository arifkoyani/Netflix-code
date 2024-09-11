"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, seterror] = useState("");
  const router = useRouter();

  async function handleForm(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      seterror("All fields are necessary");
      return;
    }

    try {
      const emailres = await fetch("/api/userexist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const { user } = await emailres.json();
      console.log("usser is :", user);
      if (user) {
        seterror("user is Exist");
      }
      if (emailres) {
        toast("successfully Created")
      }

      const response = await fetch("/api/connectfrontend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
        const {messsage}=await response.json();
      if (response) {
        seterror(messsage);
        setName("");
        setEmail("");
        setPassword("");
        router.push("Form/Login");
      }
    } catch (error) {
      console.log(error);
      seterror("Failed to connect to the server.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Enter the details
        </h2>
        <form onSubmit={handleForm}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Name"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Email"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Register
          </button>
        </form>

        <div className="mt-4 flex justify-between ">
          <p>
            {error && (
              <p className="text-red-600 text-[13px] px-2 w-fit">{error}</p>
            )}
          </p>
          <p className="text-[13px]">
            Already have an Account?
            <Link href={"Form/Login"}>
              <span className="text-blue-800 font-bold mx-1">Login</span>
            </Link>

            <Link href={"/Form/getuser"}>
            <span className="text-blue-800 font-bold mx-1">Search User</span>
            </Link> 

            <Link href={"/Form/updateuser"}>
            <span className="text-blue-800 font-bold mx-1">Update Email</span>
            </Link> 
          </p>
        </div>
        <Link href={"/Form/deleteuser"} className="px-1 mt-2 py-1 bg-red-500 text-white text-[7px] font-medium rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300">
          Delete User
        </Link>
      
      </div>
    </div>
  );
}

export default RegisterForm;
