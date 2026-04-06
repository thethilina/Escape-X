"use client"
import UserContext from '@/lib/contexts/contexts'
import { useContext } from 'react'
import Image from 'next/image'
import avatar1 from "../../public/avatars/avatar1.png"
import avatar2 from "../../public/avatars/avatar2.png"
import avatar3 from "../../public/avatars/avatar3.png"
import avatar4 from "../../public/avatars/avatar4.png"
import avatar5 from "../../public/avatars/avatar5.png"
import avatar6 from "../../public/avatars/avatar6.png"
import avatar7 from "../../public/avatars/avatar7.png"
import avatar8 from "../../public/avatars/avatar8.png"
import avatar9 from "../../public/avatars/avatar9.png"

function TopBar() {

    const { user } = useContext(UserContext)
    console.log(user)

    if (user === null) return null
  return (
    <div className='flex fixed top-0 right-0 px-10 border-b border-l border-[#3b3b3b] py-6 rounded-bl-2xl text-xl bg-[#1d1c1c] items-center space-x-3 z-50'>
       

      {user?.avatar === "avatar1" && <Image src={avatar1} alt="avatar" className='w-10 h-10 rounded-full' width={40} height={40} />}
      {user?.avatar === "avatar2" && <Image src={avatar2} alt="avatar" className='w-10 h-10 rounded-full' width={40} height={40} />}
      {user?.avatar === "avatar3" && <Image src={avatar3} alt="avatar" className='w-10 h-10 rounded-full' width={40} height={40} />}
      {user?.avatar === "avatar4" && <Image src={avatar4} alt="avatar" className='w-10 h-10 rounded-full' width={40} height={40} />}
      {user?.avatar === "avatar5" && <Image src={avatar5} alt="avatar" className='w-10 h-10 rounded-full' width={40} height={40} />}
      {user?.avatar === "avatar6" && <Image src={avatar6} alt="avatar" className='w-10 h-10 rounded-full' width={40} height={40} />}
      {user?.avatar === "avatar7" && <Image src={avatar7} alt="avatar" className='w-10 h-10 rounded-full' width={40} height={40} />}
      {user?.avatar === "avatar8" && <Image src={avatar8} alt="avatar" className='w-10 h-10 rounded-full' width={40} height={40} />}
      {user?.avatar === "avatar9" && <Image src={avatar9} alt="avatar" className='w-10 h-10 rounded-full' width={40} height={40} />}
        <h1>{user?.username}</h1>
    </div>

  )
}

export default TopBar