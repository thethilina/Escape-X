import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/users";
import { request } from "http";
import mongoose from "mongoose";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";


export const POST = async (request : Request) =>{


try{



const res = NextResponse.json({message:"logged out successfully"});

res.cookies.set({
name: "token",
value : "",
httpOnly: true , 
path : "/",
secure: process.env.NODE_ENV === "production",
sameSite: "lax",
expires: new Date(0),

})

return res;



}catch(e:any){

return new NextResponse(JSON.stringify({message:"Error logging out: " + e.message}) , {status:500}  )


}



}