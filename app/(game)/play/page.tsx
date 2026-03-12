"use client"
import { useState } from "react"

const Page = () => {











  // 0 = wall, 6 = space npc can move, 5 = doors, 1 = enemy 2 = player
  const [maze, setMaze] = useState<number[][]>([
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,6,6,6,2,6,6,6,6,6,6,6,6,5,6,6,6,6,0],
    [0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0],
    [0,6,6,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0],
    [0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,5,6,6,6,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0],
    [0,6,6,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0],
    [0,6 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0],
    [0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,5,6,6,9,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ])

  return (










    <div className="flex flex-col text-center min-h-screen items-center justify-center font-sans bg-[#0D0D0D]">
     
     
     
     <div className="border rounded-xl  p-3 bg-[#0e0e0e]">
      {maze.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-1 4] space-y-1  ">
          {row.map((cell, cellIndex) => (
            cell === 0 ? <div className="bg-[#1A2835] border border-[#19A4E0] w-7 h-7"></div> :
             cell === 5 ? <div className="bg-[#c245ad] border border-[#19A4E0] w-7 h-7"></div> : 
             cell === 6 ? <div className=" w-7 h-7"></div> : 
             cell ===1 ?  <div className="bg-[#9c2828] border rounded-full border-[#471717]  w-7 h-7"></div>:
              cell === 9 ?  <div className="bg-[#afacac] border  border-[#471717]  w-7 h-7"></div>:

             cell === 2 ? <div  className="bg-[#1750cc] border rounded-full border-[#c4c1c1]  w-7 h-7"> </div>:<></>
          ))}

        </div>
      ))}
    </div>








    </div>
  )
}

export default Page