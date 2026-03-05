import Image from "next/image";
import Link from "next/link";
import { Jaro } from 'next/font/google';
const jaro = Jaro({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jaro",
});


export default function Home() {
  return (
    <div className="flex flex-col text-center min-h-screen items-center justify-center  font-sans bg-[#0D0D0D]">

     <h1 className="jaro-font  text-8xl text-[#F46BC6]" style={{ textShadow: "1px 2px 0px #FFFFFF" }}>Escape-X</h1>
      
      <form className="text-3xl">
<input
  type="text"
  placeholder="Username"
  className="
    w-full
    mb-4
    p-2
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
    mb-4
    p-2
    border-b-2 border-gray-300
    text-white
    focus:outline-none
    focus:border-[#4e76fa]
    transition-colors
    duration-200
  "
/> 

<h2>New to Escape-X ? <Link href="/signup" className="text-[#4e76fa] hover:underline">Sign up</Link></h2> 


<button className="bg-[#1F2231] text-3xl" >Login</button>

 </form>
    </div>
  );
}
