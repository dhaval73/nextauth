import { DBconnect } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


DBconnect()

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const {token}= reqBody
        console.log("Token recived fron request : " , token);
        
        const user = await User.findOne({verifyToken : token , verifyTokenExpiry :{$gte: new Date() }})
        if(!user){
            return NextResponse.json({error : "Token is invalid or has expired"},
            {status:400})
        }

        user.isVerified = true
        user.verifyemail = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({message : "User verified successfully" , success:true},
        {status:200})
      
        
    } catch (error:any) {
        console.log("Error : ",error.message);
        return NextResponse.json({error : error.message},{status:500})
    }
}