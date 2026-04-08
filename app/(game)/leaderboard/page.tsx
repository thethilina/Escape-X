"use client"
import React, { useEffect, useState } from 'react'
import Image, { StaticImageData } from 'next/image'

import avatar1 from "../../../public/avatars/avatar1.png"
import avatar2 from "../../../public/avatars/avatar2.png"
import avatar3 from "../../../public/avatars/avatar3.png"
import avatar4 from "../../../public/avatars/avatar4.png"
import avatar5 from "../../../public/avatars/avatar5.png"
import avatar6 from "../../../public/avatars/avatar6.png"
import avatar7 from "../../../public/avatars/avatar7.png"
import avatar8 from "../../../public/avatars/avatar8.png"
import avatar9 from "../../../public/avatars/avatar9.png"

interface Player {
  rank: number;
  _id: string;
  username: string;
  avatar: string;
  level: string;
  topscore: number;
}

interface LeaderboardData {
  topThree: Player[];
  leaderboard: Player[];
}

const avatarMap: Record<string, StaticImageData> = {
  avatar1, avatar2, avatar3, avatar4, avatar5, 
  avatar6, avatar7, avatar8, avatar9
};

const LeaderboardPage: React.FC = () => {
  const [data, setData] = useState<LeaderboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        const json: LeaderboardData = await response.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center pt-20">
      
      <h1 className="text-[#d4c58d] text-3xl font-bold tracking-[0.3em] uppercase mb-16">
        Leaderboard
      </h1>

      <div className="w-full max-w-4xl px-10">
        {data.leaderboard.map((user) => (
          <div key={user._id} className="flex flex-col">
            
            <div className="flex items-center justify-between py-6">
              
              <div className="w-20 text-white text-xl font-medium">
                {user.rank} <span className="text-sm">st</span>
              </div>

              <div className="flex mr-12">
                <div className="h-14 w-14 rounded-full overflow-hidden border border-gray-800">
                  <Image 
                    src={avatarMap[user.avatar] || avatar1} 
                    alt={user.username}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 text-white text-xl tracking-tight">
                {user.username}
              </div>

              <div className="text-white text-2xl  tabular-nums">
                {user.topscore}
              </div>
            </div>

            <div className="w-full h-[1px] bg-white opacity-10" />
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeaderboardPage;