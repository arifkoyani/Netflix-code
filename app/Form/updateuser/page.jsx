"use client";

import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateEmail = () => {
  const [CurrentEmail, setCurrentEmail] = useState("");
  const [NewEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  async function handleUpdate(e) {
    e.preventDefault();
    if (!CurrentEmail || !NewEmail) {
      setError("all field Neccessary");
    }
    try {
      const respo = await fetch("/api/updateuser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CurrentEmail,
          NewEmail,
        }),
      });
        const {message}=await respo.json();
      if (respo) {
        toast(message);
        setCurrentEmail("");
        setNewEmail("");
      }

    } catch (error) {
      console.log("this is error ", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Update Email
        </h1>
        <div>
          <label className="block mb-2 text-gray-600">Current Email:</label>
          <input
            type="email"
            value={CurrentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
            placeholder="Current Email"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-600">New Email:</label>
          <input
            type="email"
            value={NewEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="New Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Update Email
        </button>
        <Link href="/" className="text-blue-800 font-bold mx-1">Register</Link>
        <ToastContainer />

        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        {message && <p className="mt-2 text-green-500 text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default UpdateEmail;
