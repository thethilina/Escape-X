"use client"
import React from 'react'

import pet from "../../../public/pet.png"
import Link from 'next/link'

function page() {

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
   <div className="flex text-center min-h-screen items-center space-x-30 justify-center align-middle   bg-[#0D0D0D]">  
   
   {/** left name and buttons */}
    <div className="flex flex-col items-start space-y-10">
        <h1 className="jaro-font  text-7xl text-[#F46BC6]" style={{ textShadow: "1px 2px 0px #FFFFFF" }}>Escape-X</h1>

        <Link href="/play"><button className='bg-[#20181D] px-3 py-4 text-xl rounded-2xl border border-[#FFF4F4] w-50 hover:cursor-pointer hover:bg-[#333450]'>Play</button></Link>
        <Link href="/leaderboard"><button className='bg-[#20181D] px-3 py-4 text-xl rounded-2xl border border-[#FFF4F4] w-50 hover:cursor-pointer hover:bg-[#333450]'>Leader Board</button></Link>
        <Link href="/profile"><button className='bg-[#20181D] px-3 py-4 text-xl rounded-2xl border border-[#FFF4F4] w-50 hover:cursor-pointer hover:bg-[#333450]'>Profile</button></Link>
     <button onClick={logout} className='text-xl font-bold text-[#aa2c2c] hover:cursor-pointer px-3'>Log Out</button>
</div>

   
   {/** right circles with numbers on em */}

<div className="flex items-center justify-center ">
  
  <div className="relative w-90 h-90 border-2 border-gray-600 rounded-full flex items-center justify-center">
    <span className="absolute top-0 left-1/2 -translate-x-1/2  text-xl  -translate-y-3 text-gray-400">0</span>
    <span className="absolute top-10 right-10 text-gray-400 text-xl">5</span>
    <span className="absolute right-0 top-1/2 translate-x-3 -translate-y-1/2 text-gray-400 text-xl">3</span>
    <span className="absolute bottom-5 left-1/4 text-gray-400 text-xl">1</span>

    <div className="relative w-72 h-72 border-2 border-gray-600 rounded-full flex items-center justify-center">
      <span className="absolute top-4 left-10 text-gray-400 text-xl">1</span>
      <span className="absolute bottom-4 right-10 text-gray-400 text-xl">4</span>
      <span className="absolute left-0 top-1/2 -translate-x-3 -translate-y-1/2 text-gray-400 text-xl">5</span>

      <div className="relative w-60 h-60 border-2 border-gray-600 rounded-full flex items-center justify-center">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 text-gray-400 text-xl">3</span>
        
        <div className="w-50 h-50 border-2 flex items-center justify-center text-5xl  border-gray-600 rounded-full"> ∑</div>
      </div>
    </div>
  </div>
</div>
   
   
   
   </div>
  )
}

export default page