"use client";
import React, { useState } from "react";
import Link from "next/link";

const SearchUser = () => {
  const [email, setEmail] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSearch = async () => {
    if (!email) {
      setError("Please enter an email.");
      return;
    }
    setError("");
    setLoading(true);

    try {
     
      const response = await fetch(`/api/getuserinfo?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("User not found");
      }

      const data = await response.json();
      setUserDetails(data);

    } catch (err) {
      setError(err.message);
      setUserDetails(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-600">
      <div className="bg-white p-6 rounded-lg shadow-md w-100">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Search User by Email
        </h1>

        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email:
        </label>
        <input
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Enter email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>

        {error && <p className="m-1 text-red-600">{error}</p>}

        {loading && <p className="mt-4 text-blue-600">Loading...</p>}

        {userDetails && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">User Details:</h2>
            <p><strong>Name:</strong> {userDetails.name}</p>
            <p><strong>Password:</strong> {userDetails.password}</p>
            <p><strong>Created At:</strong> {userDetails.createdAt}</p>
            <p><strong>Updated At:</strong> {userDetails.updatedAt}</p>
          </div>
        )}


<Link href={"/"}>
              <span className="text-blue-800 font-bold mx-1">Register</span>
            </Link>
      </div>

    
    </div>
  );
};

export default SearchUser;
