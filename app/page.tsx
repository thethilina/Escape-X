"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import Message from "@/public/components/Message";
import UserContext from "@/lib/contexts/contexts";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const loader = useTopLoader();
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Hacker-specific char set: Binary, Hex, and Math
  const chars = "01<>[]{}/\\-=_+π$λ∑&%#".split("");
  const fontSize = 18;
  
  // Create a specific number of "active streams"
  const streamCount = 80; 
  const streams = Array.from({ length: streamCount }, () => ({
    x: Math.floor(Math.random() * (canvas.width / fontSize)) * fontSize,
    y: Math.random() * -canvas.height,
    speed: 2 + Math.random() * 4, // Faster, "data-stream" speed
    char: chars[Math.floor(Math.random() * chars.length)],
    // Randomized opacity for that "depth" look (yk yth)
    opacity: 0.1 + Math.random() * 0.4 
  }));

  const draw = () => {
    // Sharp clear - NO TRAILS
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Keep your background solid
    ctx.fillStyle = "#0D0D0D";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Using a technical-looking font
    ctx.font = `bold ${fontSize}px "Courier New", monospace`;

    streams.forEach((stream) => {
      ctx.fillStyle = `rgba(244, 107, 198, ${stream.opacity})`;
      ctx.fillText(stream.char, stream.x, stream.y);

      // Move data stream down
      stream.y += stream.speed;

      // Occasionally flip the character while falling for "glitch" effect
      if (Math.random() > 0.95) {
        stream.char = chars[Math.floor(Math.random() * chars.length)];
      }

      // Reset stream to top
      if (stream.y > canvas.height) {
        stream.y = -20;
        stream.x = Math.floor(Math.random() * (canvas.width / fontSize)) * fontSize;
        stream.speed = 2 + Math.random() * 4;
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

  const showMessage = (msg: string, type: string) => {
    setMessage(msg);
    setMessageType(type);
    setIsMessageVisible(true);
    setTimeout(() => setIsMessageVisible(false), 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      loader.start();
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json(); 
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        showMessage("Login successful! Redirecting...", "success");
        setTimeout(() => router.push("/menu"), 1500);
      } else {
        showMessage("Login failed. Please check your credentials.", "error");
      }
    } catch (e: any) {
      console.error(e);
      showMessage("An error occurred. Please try again.", "error");
    } finally {
      loader.done();
    }
  };

  return (
    <div className="relative flex flex-col text-center min-h-screen items-center space-y-10 justify-center font-sans overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ backgroundColor: "#0D0D0D" }}
      />

      {isMessageVisible && <Message message={message} type={messageType} />}
      
      <div className="z-10 flex flex-col items-center space-y-10">
        <h1
          className="jaro-font text-7xl text-[#F46BC6]"
          style={{ textShadow: "1px 2px 0px #FFFFFF" }}
        >
          Escape-X
        </h1>
        <form className="text-2xl space-y-10 w-96" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border-b-2 border-gray-300 text-white bg-transparent focus:outline-none focus:border-pink-400 transition-colors duration-200"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b-2 border-gray-300 text-white bg-transparent focus:outline-none focus:border-[#4e76fa] transition-colors duration-200"
          />
          <h2 className="text-[#a7a4a4]">
            New to Escape-X?{" "}
            <Link href="/signup" className="text-[#4e76fa] hover:underline">
              Sign up
            </Link>
          </h2>
          <button
            type="submit"
            className="bg-[#1F2231] rounded-b-2xl rounded-r-2xl px-8 py-3 border border-[#FFF4F4] text-2xl text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}