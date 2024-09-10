"use client";
import { useState, useEffect } from "react";
import {Button, ButtonGroup} from "@nextui-org/button";

export default function Dashboard() {
  const [subscriptionDate, setSubscriptionDate] = useState("");
  const [username, setUsername] = useState("Netflix");
  const [service, setService] = useState("");
  const [price, setPrice] = useState("");
  const [daysElapsed, setDaysElapsed] = useState(0);
  const [exceedUsers, setExceedUsers] = useState([]); 
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    if (subscriptionDate) {
      const startDate = new Date(subscriptionDate);
      const today = new Date();
      const differenceInTime = today - startDate;
      const differenceInDays = Math.floor(
        differenceInTime / (1000 * 3600 * 24)
      );
      setDaysElapsed(differenceInDays);
    }
  }, [subscriptionDate]);

  const handlePriceSet = () => {
    alert(`Price Set: ${price}`);
  };

  const handleAddUser = () => {
    if (username && subscriptionDate) {
      const newUser = { name: username, daysElapsed, service };
      if (daysElapsed >= 30) {
        setExceedUsers([...exceedUsers, newUser]);
      } else {
        setActiveUsers([...activeUsers, newUser]);
      }
      // Clear inputs after adding the user
      setUsername("");
      setSubscriptionDate("");
      setPrice("");
      setDaysElapsed(0);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDeleteUser = (index, isExceed) => {
    if (isExceed) {
      setExceedUsers(exceedUsers.filter((_, i) => i !== index));
    } else {
      setActiveUsers(activeUsers.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="text-center py-6">
        <h1 className="text-5xl font-bold">Netflix Sale Account</h1>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-10 px-4">
        <div className="flex flex-col space-y-6">
          {/* Subscription Start Date */}
          <div>
            <label className="block mb-2">Subscription Start Date</label>
            <input
              type="date"
              value={subscriptionDate}
              onChange={(e) => setSubscriptionDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          {/* Username Setter */}
          <div className="flex items-center space-x-4">
            <div className="flex-grow">
              <label className="block mb-2">Netflix Account Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
                placeholder="Set Username"
              />
            </div>
          
          </div>

        

          {/* Service Dropdown */}
          <div>
            <label className="block mb-2">Select Service</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            >
              <option value="netflix">Netflix</option>
              <option value="amazon">Amazon</option>
              <option value="both">Both Netflix and Amazon</option>
            </select>
          </div>

          {/* Price Set Field */}
          <div className="flex items-center space-x-4">
            <div className="flex-grow">
              <label className="block mb-2">Set Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Set Price"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
              />
            </div>
       
          </div>

          {/* Add User Button */}
          <div className="mt-6">
            <button
              onClick={handleAddUser}
              className="w-full bg-[#fca728] py-3 rounded-md font-bold hover:bg-[#f69300]-700"
            >
              Add User Now
            </button>
          </div>
        </div>

        {/* Exceeds Users Section */}
        <div className="mt-8 p-4 bg-red-100 border border-red-300 rounded-md text-red-800">
          <h3 className="text-lg font-bold mb-2">Users Exceeding 30 Days</h3>
          {exceedUsers.length > 0 ? (
            <ul>
              {exceedUsers.map((user, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-2"
                >
                  <span>
                    {user.name} ({user.service}) - {user.daysElapsed} days
                  </span>
                  <button
                    onClick={() => handleDeleteUser(index, true)}
                    className="bg-red-500 px-2 py-1 rounded-md hover:bg-red-600 text-white"
                  >
                    Delete User
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No users exceeding 30 days yet.</p>
          )}
        </div>

        {/* Active Users Section */}
        <div className="mt-8 p-4 bg-green-100 border border-green-300 rounded-md text-green-800">
          <h3 className="text-lg font-bold mb-2">Active Users (Less Than 30 Days)</h3>
          {activeUsers.length > 0 ? (
            <ul>
              {activeUsers.map((user, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-2"
                >
                  <span>
                    {user.name} ({user.service}) - {user.daysElapsed} days
                  </span>
                  <button
                    onClick={() => handleDeleteUser(index, false)}
                    className="bg-green-500 px-2 py-1 rounded-md hover:bg-green-600 text-white"
                  >
                    Delete User
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No active users yet.</p>
          )}
        </div>
      </main>
    </div>
  );
}
