"use client"
import { useState, useEffect, useCallback, useRef } from "react"


const Page = () => {

const [score,setScore]=useState(0)
const [distance,setDistance]=useState(0)
const [isLocked,setIsLocked]=useState(false)
const [mathData,setMathData]=useState<{question:string,solution:number}|null>(null)
const [answer,setAnswer]=useState("")
const [gameOver,setGameOver]=useState(false)
const [isMessageVisible, setIsMessageVisible] = useState(false);
const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState("");


const pDir=useRef(0)
const eDir=useRef(0)
const enemyTick=useRef(0)

const dirs=[[1,0],[0,1],[-1,0],[0,-1]]

const [maze,setMaze]=useState<number[][]>([
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,1,6,2,6,6,6,6,6,6,6,6,6,5,6,6,6,6,0],
[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0],
[0,6,6,6,5,6,6,6,6,6,6,6,6,6,6,6,6,6,0],
[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,6,6,6,6,6,6,6,6,6,6,6,6,6,5,6,6,6,0],
[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0],
[0,6,6,6,5,6,6,6,6,6,6,6,6,6,6,6,6,6,0],
[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0],
[0,6,6,6,6,6,6,6,6,6,6,6,6,6,5,6,6,6,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
])


const fetchQuestion=useCallback(async()=>{
try{
const res=await fetch("https://marcconrad.com/uob/banana/api.php?out=json")
const data=await res.json()
setMathData({question:data.question,solution:data.solution})
}catch(e){console.log(e)}
},[])



/* SCORE */

useEffect(()=>{

if(gameOver) return

const timer=setInterval(()=>{
setScore(s=>s+5)
},1000)

return()=>clearInterval(timer)

},[gameOver])



/* SPAWN DOOR  */

const spawnDoor=(grid:number[][])=>{

let placed=false

while(!placed){

const row=Math.floor(Math.random()*(grid.length-2))+1

if(grid[row].includes(5)) continue

const possible:number[]=[]

for(let x=0;x<grid[row].length;x++){
if(grid[row][x]===6){
possible.push(x)
}
}

if(possible.length===0) continue

const col=possible[Math.floor(Math.random()*possible.length)]

grid[row][col]=5

placed=true
}

}



/* GAME LOOP */

useEffect(()=>{

if(gameOver) return

const interval=setInterval(()=>{

setMaze(prev=>{

const grid=prev.map(r=>[...r])

let player={x:-1,y:-1}
let enemy={x:-1,y:-1}

for(let y=0;y<grid.length;y++){
for(let x=0;x<grid[y].length;x++){
if(grid[y][x]===2) player={x,y}
if(grid[y][x]===1) enemy={x,y}
}
}

if(player.x===-1||enemy.x===-1) return prev

setDistance(Math.abs(player.x-enemy.x)+Math.abs(player.y-enemy.y))


/* PLAYER MOVE */

if(!isLocked){

let nx=player.x+dirs[pDir.current][0]
let ny=player.y+dirs[pDir.current][1]

if(grid[ny]?.[nx]!==6 && grid[ny]?.[nx]!==5){

for(let i=0;i<4;i++){

if(i===(pDir.current+2)%4) continue

let tx=player.x+dirs[i][0]
let ty=player.y+dirs[i][1]

if(grid[ty]?.[tx]===6 || grid[ty]?.[tx]===5){

pDir.current=i
nx=tx
ny=ty
break

}

}

}

if(grid[ny]?.[nx]===5){

setIsLocked(true)
fetchQuestion()

}else{

grid[player.y][player.x]=6
grid[ny][nx]=2

}

}



/*  ENEMY */

enemyTick.current++

if(enemyTick.current % 12 === 0){

let ex=enemy.x+dirs[eDir.current][0]
let ey=enemy.y+dirs[eDir.current][1]

if(grid[ey]?.[ex]!==6 && grid[ey]?.[ex]!==2){

for(let i=0;i<4;i++){

if(i===(eDir.current+2)%4) continue

let tx=enemy.x+dirs[i][0]
let ty=enemy.y+dirs[i][1]

if(grid[ty]?.[tx]===6 || grid[ty]?.[tx]===2){

eDir.current=i
ex=tx
ey=ty
break

}

}

}

if(grid[ey]?.[ex]===2){

setGameOver(true)
alert("Game Over")
window.location.reload()

}

grid[enemy.y][enemy.x]=6
grid[ey][ex]=1

}

return grid

})

},300)

return()=>clearInterval(interval)

},[isLocked,gameOver,fetchQuestion])



/* PUZZLE SOLVED */

const handleGo=()=>{

if(parseInt(answer)===mathData?.solution){

setScore(s=>s+200)
setMathData(null)
setAnswer("")
setIsLocked(false)

setMaze(prev=>{

const grid=prev.map(r=>[...r])

let px=-1
let py=-1

for(let y=0;y<grid.length;y++){
for(let x=0;x<grid[y].length;x++){
if(grid[y][x]===2){px=x;py=y}
}
}

let nx=px+dirs[pDir.current][0]
let ny=py+dirs[pDir.current][1]

if(grid[ny]?.[nx]===5){

grid[py][px]=6
grid[ny][nx]=2

spawnDoor(grid)

}

return grid

})

}else{

setAnswer("")

}

}



return(

<div className="flex text-center min-h-screen gap-x-5 items-center justify-center bg-[#0D0D0D] text-white">

<div className="border rounded-xl p-6 bg-[#0e0e0e]">

{maze.map((row,rI)=>(
<div key={rI} className="flex">

{row.map((cell,cI)=>{

if(cell===0) return <div key={cI} className="bg-[#1A2835] border border-[#19A4E0] w-6 h-6"></div>

if(cell===5) return <div key={cI} className="bg-[#c245ad] border border-[#19A4E0] w-6 h-6"></div>

if(cell===1) return <div key={cI} className="bg-[#9c2828] rounded-full w-6 h-6 shadow-[0_0_10px_red]"></div>

if(cell===2) return <div key={cI} className="bg-[#1750cc] rounded-full w-6 h-6 shadow-[0_0_10px_#1750cc]"></div>

return <div key={cI} className="w-6 h-6"></div>

})}

</div>
))}

</div>


<div className="border rounded-xl space-y-4 h-full p-4 bg-[#0e0e0e] w-[500px]">

<div className="flex justify-between font-bold text-xl">
<h1>Score: {score}</h1>
<h1>Distance: {distance}</h1>
</div>

<div className="bg-[#161616] h-60 rounded-xl overflow-hidden flex items-center justify-center">

{mathData
? <img src={mathData.question} className="w-full h-full object-contain p-2"/>
: <span className="opacity-20">CIRCUIT ACTIVE</span>
}

</div>

<div className="flex justify-between items-center">

<input
value={answer}
onChange={(e)=>setAnswer(e.target.value)}
disabled={!isLocked}
className="bg-transparent border-b border-white text-center w-32 text-2xl"
type="number"
/>

<button
onClick={handleGo}
disabled={!isLocked}
className="bg-[#DF88D6] text-black font-bold px-10 py-2 rounded-lg"
>
Go
</button>

</div>

</div>

</div>

)

}

export default Page