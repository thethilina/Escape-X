import React from 'react'

function Message({ message ,type}: { message: string; type: string }) {
  return (
    <div className={` bg-[#1f1c1c] text-xl border-b border-white p-10 rounded-tr-xl fixed left-0 bottom-10 shadow-md shadow-[#000000] ${type === "error" ? "text-red-500" : "text-[#16813f]"}`}>
      {message}
    </div>
  )
}

export default Message