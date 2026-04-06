"use client"
import React, { useContext } from 'react'
import UserContext from '@/lib/contexts/contexts'
import Image, { StaticImageData } from 'next/image'

// Avatar Mapping
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
  const { user } = useContext(UserContext);

  if (!user) return null;

  const currentScore = user.history?.length > 0 
    ? user.history[user.history.length - 1].score 
    : 0;

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center p-6 font-sans">
      
      <div className="w-full max-w-3xl flex flex-col">
        
        {/* Simple Header */}
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-6">
            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-[#333450]">
              <Image 
                src={avatarMap[user.avatar] || avatar1} 
                alt="Profile" 
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-white text-4xl font-bold tracking-tight">
                {user.username}
              </h1>
              <p className="text-gray-500 uppercase tracking-[0.2em] text-[10px] font-bold">
                {user.level} Level
              </p>
            </div>
          </div>
          
          <button className='bg-[#20181D] px-8 py-3 text-lg font-bold text-[#aa2c2c] rounded-2xl border border-[#FFF4F4] hover:cursor-pointer hover:bg-[#333450] transition-all active:scale-95'>
            Log Out
          </button>
        </div>

        {/* Stats Section - Matching Menu Button Colors */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Best Score", value: user.topscore },
            { label: "Current", value: currentScore },
            { label: "Rank", value: "#1" }
          ].map((stat, i) => (
            <div key={i} className="bg-[#20181D] rounded-3xl py-8 flex flex-col items-center border border-[#FFF4F4]/5">
              <span className="text-gray-500 text-[10px] uppercase tracking-widest mb-1 font-bold">{stat.label}</span>
              <span className="text-white text-3xl font-bold tabular-nums">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* History - Scrollable matching the button aesthetic */}
        <div className="flex flex-col h-[400px] w-full px-2">
          <h2 className="text-gray-600 text-[10px] uppercase tracking-[0.3em] font-black mb-4">Activity Log</h2>
          
          <div className="overflow-y-auto pr-3 custom-scrollbar space-y-2">
            {user.history?.slice(0).reverse().map((match: any) => (
              <div 
                key={match._id} 
                className="bg-[#1A1418] border border-[#FFF4F4]/5 rounded-xl p-4 flex justify-between items-center px-8 hover:bg-[#20181D] transition-all group"
              >
                <div className="flex flex-col">
                  <span className="text-gray-600 text-[9px] uppercase font-bold tracking-tighter">Date</span>
                  <span className="text-white text-sm font-semibold">{new Date(match.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex flex-col text-center">
                  <span className="text-gray-600 text-[9px] uppercase font-bold tracking-tighter">Time</span>
                  <span className="text-white text-sm font-semibold">{match.time}</span>
                </div>

                <div className="flex flex-col text-right">
                  <span className="text-gray-600 text-[9px] uppercase font-bold tracking-tighter">Score</span>
                  <span className="text-[#F46BC6] font-bold text-2xl group-hover:scale-105 transition-transform">
                    {match.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333450;
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}

export default ProfilePage;