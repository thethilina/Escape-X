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

import Link from 'next/link'













function page() {
  return (
    <div className="flex flex-col text-center min-h-screen items-center space-y-20 justify-center  font-sans bg-[#0D0D0D]">



     <h1 className="jaro-font  text-7xl text-[#F46BC6]" style={{ textShadow: "1px 2px 0px #FFFFFF" }}>Escape-X</h1>
    
< div className='flex items-center gap-x-20'>

    {/** avatars */}
    <div>
      <h2 className="text-2xl text-[#a7a4a4] mb-4">Choose your avatar</h2>   
      <div className="grid grid-cols-3 gap-4">
        <Image src={avatar1} alt="Avatar 1" className="w-24 h-24 rounded-full cursor-pointer border-2 border-transparent hover:border-[#4e76fa]" />
        <Image src={avatar2} alt="Avatar 2" className="w-24 h-24 rounded-full cursor-pointer border-2 border-transparent hover:border-[#4e76fa]" />
        <Image src={avatar3} alt="Avatar 3" className="w-24 h-24 rounded-full cursor-pointer border-2 border-transparent hover:border-[#4e76fa]" />
        <Image src={avatar4} alt="Avatar 4" className="w-24 h-24 rounded-full cursor-pointer border-2 border-transparent hover:border-[#4e76fa]" />
        <Image src={avatar5} alt="Avatar 5" className="w-24 h-24 rounded-full cursor-pointer border-2 border-transparent hover:border-[#4e76fa]" />
        <Image src={avatar6} alt="Avatar 6" className="w-24 h-24 rounded-full cursor-pointer border-2 border-transparent hover:border-[#4e76fa]" />
        <Image src={avatar7} alt="Avatar 7" className="w-24 h-24 rounded-full cursor-pointer border-2 border-transparent hover:border-[#4e76fa]" />
        <Image src={avatar8} alt="Avatar 8" className="w-24 h-24 rounded-full cursor-pointer border-2 border-transparent hover:border-[#4e76fa]" />
        <Image src={avatar9} alt="Avatar 9" className="w-24 h-24 rounded-full cursor-pointer border-2 border-transparent hover:border-[#4e76fa]" />
      </div>


    </div>


   <form className="text-2xl space-y-10 items-start flex flex-col">
<input
  type="text"
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