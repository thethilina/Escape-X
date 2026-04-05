"use client"
import React, { useState } from "react"
import Image, { StaticImageData } from "next/image"
import { useRouter } from "next/navigation"
import { useTopLoader } from "nextjs-toploader";

import Message from "@/public/components/Message"

import avatar1 from "../../public/avatars/avatar1.png"
import avatar2 from "../../public/avatars/avatar2.png"
import avatar3 from "../../public/avatars/avatar3.png"
import avatar4 from "../../public/avatars/avatar4.png"
import avatar5 from "../../public/avatars/avatar5.png"
import avatar6 from "../../public/avatars/avatar6.png"
import avatar7 from "../../public/avatars/avatar7.png"
import avatar8 from "../../public/avatars/avatar8.png"
import avatar9 from "../../public/avatars/avatar9.png"

type Avatar = {
  name: string
  img: StaticImageData
}

export default function Page() {

const avatars: Avatar[] = [
  { name: "avatar1", img: avatar1 },
  { name: "avatar2", img: avatar2 },
  { name: "avatar3", img: avatar3 },
  { name: "avatar4", img: avatar4 },
  { name: "avatar5", img: avatar5 },
  { name: "avatar6", img: avatar6 },
  { name: "avatar7", img: avatar7 },
  { name: "avatar8", img: avatar8 },
  { name: "avatar9", img: avatar9 }
]

const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")
  const loader = useTopLoader();

const [message, setMessage] = useState("")
const [messageType, setMessageType] = useState<"error" | "success" | "">("")

const router = useRouter()

const showMessage = (msg:string,type:"error"|"success") => {
  setMessage(msg)
  setMessageType(type)

  setTimeout(()=>{
    setMessage("")
    setMessageType("")
  },3000)
}

const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault()

  if(!selectedAvatar){
    showMessage("Please select an avatar","error")
    return
  }

  if(password !== confirmPassword){
    showMessage("Passwords do not match","error")
    return
  }

  try {
      loader.start();

    const response = await fetch("/api/auth/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username,
        password,
        avatar:selectedAvatar
      })
    })

    const data = await response.json()

    if(response.ok){

      showMessage("Registration successful","success")

      setTimeout(()=>{
        router.push("/")
      },1200)

    }else{
      showMessage(data.message || "Registration failed","error")
    }

  } catch (error) {
    console.error(error)
    showMessage("Server error occurred","error")
  } finally {
    loader.done()
  }
}

return (
<div className="flex flex-col text-center min-h-screen items-center space-y-20 justify-center font-sans bg-[#0D0D0D]">

{message && <Message message={message} type={messageType} />}

<h1
className="jaro-font text-7xl text-[#F46BC6]"
style={{ textShadow: "1px 2px 0px #FFFFFF" }}
>
Escape-X
</h1>

<div className="flex items-center gap-x-20">

{/* avatars */}
<div>

<h2 className="text-2xl text-[#a7a4a4] mb-4">
Choose your avatar
</h2>

<div className="grid grid-cols-3 gap-4">

{avatars.map((avatar)=>(
<Image
key={avatar.name}
src={avatar.img}
alt={avatar.name}
onClick={()=>setSelectedAvatar(avatar.name)}
className={`w-24 h-24 rounded-full cursor-pointer hover:border-[#4e76fa]
${
selectedAvatar===avatar.name
? "border-2 border-[#4e76fa] shadow-lg shadow-[#4e76fa]"
: "border-2 border-transparent"
}`}
/>
))}

</div>
</div>

<form
onSubmit={handleRegister}
className="text-2xl space-y-10 items-start flex flex-col"
>

<input
type="text"
value={username}
onChange={(e)=>setUsername(e.target.value)}
placeholder="Create A Username"
className="w-full border-b-2 border-gray-300 text-white bg-transparent focus:outline-none focus:border-pink-400"
/>

<input
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
placeholder="Create A Password"
className="w-full border-b-2 border-gray-300 text-white bg-transparent focus:outline-none focus:border-[#4e76fa]"
/>

<input
type="password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
placeholder="Confirm Your Password"
className="w-full border-b-2 border-gray-300 text-white bg-transparent focus:outline-none focus:border-[#4e76fa]"
/>

<button
type="submit"
className="bg-[#1F2231] rounded-b-2xl rounded-r-2xl px-8 py-3 border border-[#FFF4F4] text-2xl"
>
Register
</button>

</form>

</div>
</div>
)
}