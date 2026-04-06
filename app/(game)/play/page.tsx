"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import { useContext } from "react"
import UserContext from "@/lib/contexts/contexts"
import Message from "@/public/components/Message"

const Page = () => {

const [score,setScore]=useState(0)
const [distance,setDistance]=useState(0)
const [isLocked,setIsLocked]=useState(false)
const [mathData,setMathData]=useState<{question:string,solution:number}|null>(null)
const [answer,setAnswer]=useState("")
const [gameOver,setGameOver]=useState(false)
const [isMessageVisible, setIsMessageVisible] = useState(false)
const [message, setMessage] = useState("")
const [messageType, setMessageType] = useState("")
const { user, setUser } = useContext(UserContext)
const [gameStarted, setGameStarted] = useState(false)
const hasUpdatedScore = useRef(false)
const scoreRef = useRef(0)
const userRef = useRef(user)
const setUserRef = useRef(setUser)
const setMessageRef = useRef(setMessage)
const setMessageTypeRef = useRef(setMessageType)
const setIsMessageVisibleRef = useRef(setIsMessageVisible)

useEffect(() => { scoreRef.current = score }, [score])
useEffect(() => { userRef.current = user }, [user])
useEffect(() => { setUserRef.current = setUser }, [setUser])

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

/* SCORE TIMER */
useEffect(()=>{
if(gameOver || !gameStarted) return
const timer=setInterval(()=>{
setScore(s=>s+5)
},1000)
return()=>clearInterval(timer)
},[gameOver, gameStarted])

/* SPAWN DOOR */
const spawnDoor=(grid:number[][])=>{
let placed=false
while(!placed){
const row=Math.floor(Math.random()*(grid.length-2))+1
if(grid[row].includes(5)) continue
const possible:number[]=[]
for(let x=0;x<grid[row].length;x++){
if(grid[row][x]===6) possible.push(x)
}
if(possible.length===0) continue
const col=possible[Math.floor(Math.random()*possible.length)]
grid[row][col]=5
placed=true
}
}

/* GAME LOOP */
useEffect(()=>{
if(gameOver || !gameStarted) return

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

/* ENEMY */
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

/* ENEMY CATCHES PLAYER */
if(grid[ey]?.[ex]===2){
if(!hasUpdatedScore.current){
hasUpdatedScore.current=true
const finalScore = scoreRef.current
setGameOver(true)

;(async()=>{
const currentUser = userRef.current

// No user logged in
if(!currentUser){
setMessageRef.current(`💀 Game Over! Score: ${finalScore}`)
setMessageTypeRef.current("error")
setIsMessageVisibleRef.current(true)
setTimeout(()=>setIsMessageVisibleRef.current(false), 4000)
return
}

try{
const res = await fetch("/api/Updatescores",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({ userId: currentUser._id, score: finalScore })
})
const data = await res.json()

if(res.ok){
// API returns { topscore, level } directly (not nested in updatedUser)
const isNewTopScore = finalScore >= data.topscore
if(isNewTopScore){
setMessageRef.current(`🏆 Congratulations! New Top Score: ${finalScore}! You reached ${data.level}!`)
}else{
setMessageRef.current(`💀 Game Over! Score: ${finalScore} | Best: ${data.topscore}`)
}
setMessageTypeRef.current("success")
}else{
setMessageRef.current(`💀 Game Over! Score: ${finalScore}`)
setMessageTypeRef.current("error")
}
}catch(err){
console.log(err)
setMessageRef.current(`💀 Game Over! Score: ${finalScore}`)
setMessageTypeRef.current("error")
}

setIsMessageVisibleRef.current(true)
setTimeout(()=>setIsMessageVisibleRef.current(false), 4000)
})()
}
}

grid[enemy.y][enemy.x]=6
grid[ey][ex]=1
}

return grid
})
},100)

return()=>clearInterval(interval)
},[isLocked,gameOver,fetchQuestion,gameStarted])

/* PUZZLE SOLVED */
const handleGo=()=>{
if(parseInt(answer)===mathData?.solution){
setScore(s=>s+200)
setMathData(null)
setAnswer("")
setIsLocked(false)

setMaze(prev=>{
const grid=prev.map(r=>[...r])
let px=-1, py=-1
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

/* RESET */
const resetGame = () => {
setScore(0)
scoreRef.current = 0
setDistance(0)
setIsLocked(false)
setMathData(null)
setAnswer("")
setGameOver(false)
setGameStarted(false)
setIsMessageVisible(false)
hasUpdatedScore.current = false
pDir.current = 0
eDir.current = 0
enemyTick.current = 0

setMaze([
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
}

const startGame = () => {
resetGame()
setGameStarted(true)
}

return (
  <div className="flex min-h-screen items-center justify-center bg-[#0D0D0D] text-white p-4 font-sans antialiased">
    {isMessageVisible && (
      <div className="fixed top-5 z-50 animate-pulse">
        <Message message={message} type={messageType} />
      </div>
    )}

    {/* Main Container - Unified height for alignment */}
    <div className="flex gap-x-6 h-[750px]">

      {/* LEFT PANEL */}
      <div className="border border-white/20 rounded-2xl p-6 bg-[#0e0e0e] w-[320px] flex flex-col justify-between shadow-2xl">
        <div>
          <h2 className="text-2xl font-black mb-6 text-[#19A4E0] text-center tracking-tighter uppercase">Operations</h2>
          <div className="text-left space-y-5 text-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-[#1750cc] rounded-full w-4 h-4 shadow-[0_0_10px_#1750cc]"></div>
                <p><strong className="text-white">Player:</strong> Blue Unit</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#9c2828] rounded-full w-4 h-4 shadow-[0_0_10px_red]"></div>
                <p><strong className="text-white">Enemy:</strong> Red Threat</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#c245ad] w-4 h-4 border border-[#19A4E0]"></div>
                <p><strong className="text-white">Gate:</strong> Math Lock</p>
              </div>
            </div>
            
            <div className="pt-5 border-t border-white/10 space-y-2 text-gray-400 italic">
              <p>• Auto-navigation engaged</p>
              <p>• Bounce off walls to turn</p>
              <p>• Solve Gate to bypass</p>
              <p>• Evade enemy contact</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          {!gameStarted && !gameOver && (
            <button onClick={startGame} className="w-full bg-[#19A4E0] hover:bg-[#1487b8] text-black font-black py-4 rounded-xl text-xl transition-all active:scale-95 shadow-lg">
              START GAME
            </button>
          )}

          {gameOver && (
            <button onClick={startGame} className="w-full bg-[#DF88D6] hover:bg-[#c76ab8] text-black font-black py-4 rounded-xl text-xl transition-all active:scale-95 shadow-lg">
              RETRY
            </button>
          )}
        </div>
      </div>

      {/* RIGHT PANEL - Aligned with Left Panel height */}
      <div className="flex flex-col gap-y-4 h-full w-[600px]">

        {/* MAZE SECTION (40%) */}
        <div className="h-[40%] border border-white/20 rounded-2xl p-5 bg-[#0e0e0e] flex items-center justify-center overflow-hidden shadow-xl">
          <div className="inline-block border border-white/5 p-1 bg-black/20">
            {maze.map((row, rI) => (
              <div key={rI} className="flex">
                {row.map((cell, cI) => {
                  const size = "w-7 h-7"; 
                  if (cell === 0) return <div key={cI} className={`bg-[#1A2835] border border-[#19A4E0]/20 ${size}`}></div>
                  if (cell === 5) return <div key={cI} className={`bg-[#c245ad] border border-[#19A4E0] ${size}`}></div>
                  if (cell === 1) return <div key={cI} className={`bg-[#9c2828] rounded-full shadow-[0_0_8px_red] ${size} scale-90`}></div>
                  if (cell === 2) return <div key={cI} className={`bg-[#1750cc] rounded-full shadow-[0_0_8px_#1750cc] ${size} scale-90`}></div>
                  return <div key={cI} className={size}></div>
                })}
              </div>
            ))}
          </div>
        </div>

        {/* HUD & PROBLEM SECTION (60%) */}
        <div className="h-[60%] border border-white/20 rounded-2xl bg-[#0e0e0e] flex flex-col p-6 shadow-2xl overflow-hidden">
          <div className="flex justify-between font-black text-2xl mb-4 border-b border-white/5 pb-2">
            <h1 className="text-[#19A4E0]">Score: {score}</h1>
            <h1 className="text-[#DF88D6]">Dist: {distance}</h1>
          </div>

          {/* IMAGE BOX - Centered and Large */}
          <div className="flex-grow bg-[#161616] rounded-xl flex items-center justify-center border border-white/10 overflow-hidden mb-6 shadow-inner">
            {mathData ? (
              <img 
                src={mathData.question} 
                className="w-full h-full object-contain p-4" 
                alt="Math Question" 
              />
            ) : (
              <span className="opacity-10 text-xl font-black tracking-[0.5em]">SYSTEM STANDBY</span>
            )}
          </div>

          {/* INPUT & BUTTON - Sleek footer alignment */}
          <div className="flex justify-between items-center gap-x-8 px-2 pb-2">
            <div className="flex-1">
              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={!isLocked}
                className="bg-transparent border-b-2 border-white/20 w-full py-2 text-left text-5xl font-black focus:outline-none focus:border-[#19A4E0] transition-all placeholder:text-white/5"
                type="number"
                placeholder="VAL"
              />
            </div>
            <button
              onClick={handleGo}
              disabled={!isLocked}
              className="bg-[#DF88D6] disabled:bg-gray-800 disabled:text-gray-500 text-black font-black px-12 py-3 rounded-lg text-xl transition-all active:scale-95 shadow-md uppercase"
            >
              Go
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
);
}

export default Page
