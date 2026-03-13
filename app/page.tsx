"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import Message from "@/public/components/Message";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const loader = useTopLoader();
  const router = useRouter();

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
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
    <div className="flex flex-col text-center min-h-screen items-center space-y-10 justify-center font-sans bg-[#0D0D0D]">
      {isMessageVisible && <Message message={message} type={messageType} />}
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
          className="
            w-full
            border-b-2 border-gray-300
            text-white
            bg-transparent
            focus:outline-none
            focus:border-pink-400
            transition-colors
            duration-200
          "
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full
            border-b-2 border-gray-300
            text-white
            bg-transparent
            focus:outline-none
            focus:border-[#4e76fa]
            transition-colors
            duration-200
          "
        />
        <h2 className="text-[#a7a4a4]">
          New to Escape-X?{" "}
          <Link href="/signup" className="text-[#4e76fa] hover:underline">
            Sign up
          </Link>
        </h2>
        <button
          type="submit"
          className="bg-[#1F2231] rounded-b-2xl rounded-r-2xl px-8 py-3 border border-[#FFF4F4] text-2xl"
        >
          Login
        </button>
      </form>
    </div>
  );
}
