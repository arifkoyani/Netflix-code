"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";

import { WavyBackground } from "../../components/uii/wavy-background";
const login = () => {
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [error, seterror] = useState("");


  async function HandleForm(e){
    e.preventDefault();
      if(!email || !password){
        seterror("All field are Neccessary")
        return
      }

      const emailres = await fetch("/api/userexist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const { user } = await emailres.json();
        console.log("usser is :",user)

      if (user) {
        setemail("")
        setpassword("")
        seterror("");
        alert("successfully Logined")

      }
      else{
        seterror("user is Not Exist");


      }

  }
  return (
    <div>
<WavyBackground className="w-screen h-screen mx-auto pb-40">
      
<div className="min-h-screen flex items-center justify-center bg-transparent">
     <div className="w-full max-w-md bg-transparent rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Enter the details</h2>
       <form  onSubmit={HandleForm}>
          <div className="mb-4">
             <label className="block text-sm font-medium text-white" htmlFor="email">
              Email
            </label>
            <input

              type="email"
              value={email}
              id="email"
              onChange={(e)=>setemail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-white" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e)=>setpassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Login
          </button>
        </form>
        <div className="mt-4 flex justify-between ">
          <p>
            {error && (
              <p className="text-red-600 text-[13px] px-2 w-fit">{error}</p>
            )}
          </p>
          <p className="text-[13px] text-white">
            Don't have an Account?
            
            <Link href={"/"}>
            <span className="text-blue-800 font-bold mx-1">Register</span>
            </Link> 
          </p>
        </div>
 <Link href="/Form/deleteuser">
 <button
  className="px-1 mt-2 py-1 bg-red-500 text-white text-[9px] font-medium rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
    >
  Delete User
</button>
 </Link>
      </div>
     </div>

      
    </WavyBackground>
    </div>
  )
}

export default login


