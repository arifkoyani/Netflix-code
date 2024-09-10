"use client";
import Link from "next/link";
import React, { useState } from "react";
import MoonLoader from "react-spinners/MoonLoader"; 

const DeleteUser = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message,setmessage]=useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!email) {
      setError("Enter the Email");
      return;
    }
    try {
      setLoading(true); 
      const res = await fetch("/api/deleteuser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const {message}= await res.json();

        setmessage(message)
 
    } catch (error) {
      console.log("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Enter Email
        </h1>
        <input
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Enter email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleDelete}
          className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
        >
          Delete
        </button>

        {error && <p className="m-1 text-[10px] text-red-600">{error}</p>}

        {message&&<p className="m-1 text-[10px] text-red-600">{message}</p>}
        <Link href={"/"}>
            <span className="text-blue-800 font-bold mx-1">Register</span>
            </Link> 
      </div>


      {loading && (
        <MoonLoader color="#c30e0e" loading={loading} size={16} speedMultiplier={1} />
      )}


    </div>
  );
};

export default DeleteUser;
