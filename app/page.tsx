import Image from "next/image";
import Link from "next/link";



export default function Home() {
  return (
    <div className="flex flex-col text-center min-h-screen items-center space-y-10 justify-center  font-sans bg-[#0D0D0D]">

     <h1 className="jaro-font  text-7xl text-[#F46BC6]" style={{ textShadow: "1px 2px 0px #FFFFFF" }}>Escape-X</h1>
      
      <form className="text-2xl space-y-10">
<input
  type="text"
  placeholder="Username"
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
  placeholder="Password"
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

<h2 className="text-[#a7a4a4]">New to Escape-X ? <Link href="/signup" className="text-[#4e76fa] hover:underline">Sign up</Link></h2> 


<button className="bg-[#1F2231] rounded-b-2xl rounded-r-2xl  px-8 py-3 border border-[#FFF4F4] text-2xl" >Login</button>

 </form>
    </div>
  );
}
