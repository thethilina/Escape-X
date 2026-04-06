"use client"
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '@/lib/contexts/contexts'
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

const avatarMap: Record<string, StaticImageData> = {
  avatar1, avatar2, avatar3, avatar4, avatar5, 
  avatar6, avatar7, avatar8, avatar9
};

function ProfilePage() {
  const { user: contextUser } = useContext(UserContext);
  const [userData, setUserData] = useState<any>(null);
  const [rank, setRank] = useState<number | string>("--");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!contextUser?._id) return;

      try {
        const response = await fetch(`/api/getuser?userid=${contextUser._id}`);
        const data = await response.json();
        
        if (data.user) {
          setUserData(data.user);
          setRank(data.rank); 
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [contextUser?._id]);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[#F46BC6] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-bold">Loading Profile</p>
        </div>
      </div>
    );
  }

  if (!userData) return null;

  const currentScore = userData.history?.length > 0 
    ? userData.history[userData.history.length - 1].score 
    : 0;

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center p-6 font-sans">
      
      <div className="w-full max-w-3xl flex flex-col">
        
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-[#333450] shadow-xl">
              <Image 
                src={avatarMap[userData.avatar] || avatar1} 
                alt="Profile" 
                className="object-cover"
                width={80}
                height={80}
              />
            </div>
            <div>
              <h1 className="text-white text-4xl font-bold tracking-tight">
                {userData.username}
              </h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-gray-500 uppercase tracking-[0.2em] text-[10px] font-bold">
                  {userData.level} Status
                </p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={logout} 
            className='bg-[#20181D] px-8 py-3 text-sm font-black uppercase tracking-widest text-[#ff4d4d] rounded-2xl border border-[#ff4d4d]/20 hover:cursor-pointer hover:bg-[#331a1a] transition-all active:scale-95'
          >
            Log Out
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Best Score", value: userData.topscore.toLocaleString() },
            { label: "Current", value: currentScore.toLocaleString() },
            { label: "Global Rank", value: `#${rank}` }
          ].map((stat, i) => (
            <div key={i} className="bg-[#1A1418] rounded-3xl py-8 flex flex-col items-center border border-[#FFF4F4]/5 shadow-2xl">
              <span className="text-gray-600 text-[9px] uppercase font-black tracking-[0.2em] mb-2">{stat.label}</span>
              <span className="text-white text-3xl font-bold tabular-nums">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col h-[450px] w-full px-2">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-gray-500 text-[10px] uppercase tracking-[0.4em] font-black">Match History</h2>
            <span className="text-[9px] text-gray-700 font-bold">{userData.history?.length || 0} Total Games</span>
          </div>
          
          <div className="overflow-y-auto pr-3 custom-scrollbar space-y-3">
            {userData.history?.slice(0).reverse().map((match: any) => (
              <div 
                key={match._id} 
                className="bg-[#161114] border border-white/5 rounded-2xl p-5 flex justify-between items-center px-10 hover:bg-[#1f181c] transition-all group"
              >
                <div className="flex flex-col">
                  <span className="text-gray-600 text-[8px] uppercase font-black mb-1">Date</span>
                  <span className="text-gray-300 text-sm font-medium">{new Date(match.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex flex-col text-center">
                  <span className="text-gray-600 text-[8px] uppercase font-black mb-1">Time</span>
                  <span className="text-gray-300 text-sm font-medium">{match.time}</span>
                </div>

                <div className="flex flex-col text-right">
                  <span className="text-gray-600 text-[8px] uppercase font-black mb-1">Score</span>
                  <span className="text-[#F46BC6] font-bold text-2xl group-hover:drop-shadow-[0_0_8px_rgba(244,107,198,0.4)] transition-all">
                    {match.score.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333450;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444570;
        }
      `}</style>
    </div>
  )
}

export default ProfilePage;