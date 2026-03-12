"use client"

import { useEffect, useRef, useState } from "react"

type Tile = "wall" | "path" | "door"

const TILE = 32

const maze: Tile[][] = [
  ["wall","wall","wall","wall","wall","wall","wall","wall","wall","wall"],
  ["wall","path","path","door","path","path","path","path","path","wall"],
  ["wall","path","wall","wall","wall","path","wall","wall","path","wall"],
  ["wall","path","path","path","path","path","path","door","path","wall"],
  ["wall","wall","wall","path","wall","wall","path","wall","path","wall"],
  ["wall","path","path","path","path","path","path","path","path","wall"],
  ["wall","path","wall","wall","wall","wall","wall","wall","path","wall"],
  ["wall","path","path","door","path","path","path","path","path","wall"],
  ["wall","wall","wall","wall","wall","wall","wall","wall","wall","wall"],
]

export default function Game() {

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const player = useRef({ x:1, y:1 })
  const enemy = useRef({ x:1, y:7 })

  const direction = useRef({ x:1, y:0 })

  const [question,setQuestion] = useState<any>(null)
  const [input,setInput] = useState("")
  const [solution,setSolution] = useState<number | null>(null)
  const [gameOver,setGameOver] = useState(false)

  async function getQuestion(){
    const res = await fetch("https://marcconrad.com/uob/banana/api.php?out=json")
    const data = await res.json()

    setQuestion(data.question)
    setSolution(data.solution)
  }

  function movePlayer(){

    if(question) return

    const nx = player.current.x + direction.current.x
    const ny = player.current.y + direction.current.y

    if(maze[ny][nx] !== "wall"){
      player.current.x = nx
      player.current.y = ny
    }

    if(maze[ny][nx] === "door"){
      getQuestion()
    }

  }

  function moveEnemy(){

    if(gameOver) return

    const dx = player.current.x - enemy.current.x
    const dy = player.current.y - enemy.current.y

    if(Math.abs(dx) > Math.abs(dy)){
      enemy.current.x += Math.sign(dx)
    } else {
      enemy.current.y += Math.sign(dy)
    }

    if(enemy.current.x === player.current.x &&
       enemy.current.y === player.current.y){
        setGameOver(true)
    }

  }

  function draw(){

    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    ctx.clearRect(0,0,canvas.width,canvas.height)

    for(let y=0;y<maze.length;y++){
      for(let x=0;x<maze[y].length;x++){

        if(maze[y][x]==="wall") ctx.fillStyle="#1e293b"
        if(maze[y][x]==="path") ctx.fillStyle="#111"
        if(maze[y][x]==="door") ctx.fillStyle="#7c3aed"

        ctx.fillRect(x*TILE,y*TILE,TILE,TILE)
      }
    }

    ctx.fillStyle="blue"
    ctx.beginPath()
    ctx.arc(
      player.current.x*TILE+16,
      player.current.y*TILE+16,
      10,0,Math.PI*2)
    ctx.fill()

    ctx.fillStyle="red"
    ctx.beginPath()
    ctx.arc(
      enemy.current.x*TILE+16,
      enemy.current.y*TILE+16,
      10,0,Math.PI*2)
    ctx.fill()
  }

  useEffect(()=>{

    const interval = setInterval(()=>{

      movePlayer()
      moveEnemy()
      draw()

    },300)

    return ()=>clearInterval(interval)

  },[question,gameOver])

  function submit(){

    if(Number(input) === solution){
      setQuestion(null)
      setInput("")
    }

  }

  return(
    <>
      <canvas
        ref={canvasRef}
        width={maze[0].length*TILE}
        height={maze.length*TILE}
      />

      <div className="w-80">

        {gameOver && <h1 className="text-red-500">GAME OVER</h1>}

        {question && (
          <div className="flex flex-col gap-3">

            <img src={question}/>

            <input
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              className="p-2 text-black"
            />

            <button
              onClick={submit}
              className="bg-purple-500 p-2"
            >
              Go
            </button>

          </div>
        )}

      </div>
    </>
  )
}