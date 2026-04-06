"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01<>[]{}/\\-=_+π$λ∑&%#".split("");
    const fontSize = 18;
    const streamCount = 60; 
    
    const streams = Array.from({ length: streamCount }, () => ({
      x: Math.floor(Math.random() * (canvas.width / fontSize)) * fontSize,
      y: Math.random() * -canvas.height,
      speed: 1 + Math.random() * 2, 
      char: chars[Math.floor(Math.random() * chars.length)],
      opacity: 0.1 + Math.random() * 0.2 
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0D0D0D";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px monospace`;

      streams.forEach((stream) => {
        ctx.fillStyle = `rgba(244, 107, 198, ${stream.opacity})`;
        ctx.fillText(stream.char, stream.x, stream.y);
        stream.y += stream.speed;
        if (Math.random() > 0.98) stream.char = chars[Math.floor(Math.random() * chars.length)];
        if (stream.y > canvas.height) {
          stream.y = -20;
          stream.x = Math.floor(Math.random() * (canvas.width / fontSize)) * fontSize;
        }
      });
      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="relative flex text-center min-h-screen items-center space-x-32 justify-center overflow-hidden bg-[#0D0D0D]">
      
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

      <div className="flex flex-col items-start space-y-10 z-10">
        <h1 className="jaro-font text-7xl text-[#F46BC6]" style={{ textShadow: "1px 2px 0px #FFFFFF" }}>
          Escape-X
        </h1>

        <Link href="/play">
          <button className='bg-[#20181D] px-3 py-4 text-xl rounded-2xl border border-[#FFF4F4] w-60 hover:cursor-pointer hover:bg-[#333450] transition-all'>
            Play
          </button>
        </Link>
        <Link href="/leaderboard">
          <button className='bg-[#20181D] px-3 py-4 text-xl rounded-2xl border border-[#FFF4F4] w-60 hover:cursor-pointer hover:bg-[#333450] transition-all'>
            Leader Board
          </button>
        </Link>
        <Link href="/profile">
          <button className='bg-[#20181D] px-3 py-4 text-xl rounded-2xl border border-[#FFF4F4] w-60 hover:cursor-pointer hover:bg-[#333450] transition-all'>
            Profile
          </button>
        </Link>
        <button onClick={logout} className='text-xl font-bold text-[#aa2c2c] hover:cursor-pointer px-3'>
          Log Out
        </button>
      </div>

      <div className="relative flex items-center justify-center z-10">
        
        <div className="relative w-96 h-96 border-2 border-gray-600 rounded-full flex items-center justify-center animate-[spin_25s_linear_infinite]">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 text-xl text-gray-400">0</span>
          <span className="absolute top-10 right-10 text-gray-400 text-xl">5</span>
          <span className="absolute right-0 top-1/2 translate-x-3 -translate-y-1/2 text-gray-400 text-xl">3</span>
          <span className="absolute bottom-5 left-1/4 text-gray-400 text-xl">1</span>

          <div className="relative w-72 h-72 border-2 border-gray-600 rounded-full flex items-center justify-center animate-[spin_18s_linear_infinite_reverse]">
            <span className="absolute top-4 left-10 text-gray-400 text-xl">1</span>
            <span className="absolute bottom-4 right-10 text-gray-400 text-xl">4</span>
            <span className="absolute left-0 top-1/2 -translate-x-3 -translate-y-1/2 text-gray-400 text-xl">5</span>

            <div className="relative w-60 h-60 border-2 border-gray-600 rounded-full flex items-center justify-center">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 text-gray-400 text-xl">3</span>
              
              <div className="w-50 h-50 border-2 flex items-center justify-center text-5xl border-gray-600 rounded-full text-white"> 
                ∑ 
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Page;