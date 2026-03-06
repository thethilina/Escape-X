"use client"
import React from 'react'
import avatar1 from "../../../public/avatars/avatar1.png"
import avatar2 from "../../../public/avatars/avatar2.png"
import avatar3 from "../../../public/avatars/avatar3.png"
import avatar4 from "../../../public/avatars/avatar4.png"
import avatar5 from "../../../public/avatars/avatar5.png"
import avatar6 from "../../../public/avatars/avatar6.png"
import avatar7 from "../../../public/avatars/avatar7.png"
import avatar8 from "../../../public/avatars/avatar8.png"
import avatar9 from "../../../public/avatars/avatar9.png"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'





function page() {


const [selectedAvatar, setSelectedAvatar] = useState(null);
const [usename , setUsername] = useState("");
const [password , setPassword] = useState("");
const [confirmPassword , setConfirmPassword] = useState("");
const router = useRouter();


const handleRegister = async (e:any) => {
  e.preventDefault();
  if(password !== confirmPassword){
    alert("Passwords do not match!");
    return;
  }
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: usename, password, avatar: selectedAvatar }),
    });
    const data = await response.json();
    if (response.ok) {
      alert('Registration successful!');
      router.push('/');
    } else {
      alert(data.message || 'Registration failed!');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during registration!');
  } 

}

const handleAvatarClick = (avatar:any) => {
  setSelectedAvatar(avatar);
};  
  





  return (
    <div className="flex flex-col text-center min-h-screen items-center space-y-20 justify-center  font-sans bg-[#0D0D0D]">



     <h1 className="jaro-font  text-7xl text-[#F46BC6]" style={{ textShadow: "1px 2px 0px #FFFFFF" }}>Escape-X</h1>

    
< div className='flex items-center gap-x-20'>

    {/** avatars */}
    <div>
      <h2 className="text-2xl text-[#a7a4a4] mb-4">Choose your avatar</h2>   
      <div className="grid grid-cols-3 gap-4">
        <Image onClick={() => handleAvatarClick("avatar1")} src={avatar1} alt="Avatar 1" className={`w-24 h-24 rounded-full cursor-pointer hover:border-[#4e76fa] ${selectedAvatar === "avatar1" ? 'border-2 border-[#4e76fa] shadow-lg shadow-[#4e76fa]' : 'border-2 border-transparent'}`} />
        <Image onClick={() => handleAvatarClick("avatar2")} src={avatar2} alt="Avatar 2" className={`w-24 h-24 rounded-full cursor-pointer hover:border-[#4e76fa] ${selectedAvatar === "avatar2" ? 'border-2 border-[#4e76fa] shadow-lg shadow-[#4e76fa]' : 'border-2 border-transparent'}`} />
        <Image onClick={() => handleAvatarClick("avatar3")} src={avatar3} alt="Avatar 3" className={`w-24 h-24 rounded-full cursor-pointer hover:border-[#4e76fa] ${selectedAvatar === "avatar3" ? 'border-2 border-[#4e76fa] shadow-lg shadow-[#4e76fa]' : 'border-2 border-transparent'}`} />
        <Image onClick={() => handleAvatarClick("avatar4")} src={avatar4} alt="Avatar 4" className={`w-24 h-24 rounded-full cursor-pointer hover:border-[#4e76fa] ${selectedAvatar === "avatar4" ? 'border-2 border-[#4e76fa] shadow-lg shadow-[#4e76fa]' : 'border-2 border-transparent'}`} />
        <Image onClick={() => handleAvatarClick("avatar5")} src={avatar5} alt="Avatar 5" className={`w-24 h-24 rounded-full cursor-pointer hover:border-[#4e76fa] ${selectedAvatar === "avatar5" ? 'border-2 border-[#4e76fa] shadow-lg shadow-[#4e76fa]' : 'border-2 border-transparent'}`} />
        <Image onClick={() => handleAvatarClick("avatar6")} src={avatar6} alt="Avatar 6" className={`w-24 h-24 rounded-full cursor-pointer hover:border-[#4e76fa] ${selectedAvatar === "avatar6"   ? 'border-2 border-[#4e76fa] shadow-lg shadow-[#4e76fa]' : 'border-2 border-transparent'}`} />
        <Image onClick={() => handleAvatarClick("avatar7")} src={avatar7} alt="Avatar 7" className={`w-24 h-24 rounded-full cursor-pointer hover:border-[#4e76fa] ${selectedAvatar === "avatar7" ? 'border-2 border-[#4e76fa] shadow-lg shadow-[#4e76fa]' : 'border-2 border-transparent'}`} />
        <Image onClick={() => handleAvatarClick("avatar8")} src={avatar8} alt="Avatar 8" className={`w-24 h-24 rounded-full cursor-pointer hover:border-[#4e76fa] ${selectedAvatar === "avatar8" ? 'border-2 border-[#4e76fa] shadow-lg shadow-[#4e76fa]' : 'border-2 border-transparent'}`} />
        <Image onClick={() => handleAvatarClick("avatar9")} src={avatar9} alt="Avatar 9" className={`w-24 h-24 rounded-full cursor-pointer hover:border-[#4e76fa] ${selectedAvatar === "avatar9" ? 'border-2 border-[#4e76fa] shadow-lg shadow-[#4e76fa]' : 'border-2 border-transparent'}`} />
      </div>


    </div>


   <form  
    onSubmit={(e)=>{handleRegister(e)}}
    className="text-2xl space-y-10 items-start flex flex-col">

      
<input
  type="text"
  value={usename}
  onChange={(e)=>{setUsername(e.target.value)}}
  placeholder="Create An Username"
  className="
    w-full
    
    
    border-b-2 border-gray-300
    text-white
    focus:outline-none
    focus:border-pink-400
    transition-colors
    duration-200
  "
/>     

<input
  type="password"
  value={password}
  onChange={(e)=>{setPassword(e.target.value)}}
  placeholder="Create A Password"
  className="
    w-full
  
    border-b-2 border-gray-300
    text-white
    focus:outline-none
    focus:border-[#4e76fa]
    transition-colors
    duration-200
  "
/> 


<input
  type="password"
  value={confirmPassword}
  onChange={(e)=>{setConfirmPassword(e.target.value)}}
  placeholder= "Confirm Your Password"
  className="
    w-full
  
    border-b-2 border-gray-300
    text-white
    focus:outline-none
    focus:border-[#4e76fa]
    transition-colors
    duration-200
  "
/> 


<button className="bg-[#1F2231] rounded-b-2xl rounded-r-2xl  px-8 py-3 border border-[#FFF4F4] text-2xl" >Register</button>

 </form>



</div>


    </div>
  )
}

export default page