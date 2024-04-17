import { DBconnect } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { getUserIdByToken } from "@/helpers/getUserIdBytoken";

DBconnect()

export async function GET(request : NextRequest){

    try {
    const userId = await getUserIdByToken(request)
    // console.log("userId" , userId);
    
    if(userId){
        const user = await User.findById(userId).select('-password')
        if(user){
            return NextResponse.json({
                data : user,
                message: 'User found',
                success : true
            },{status:200})
        }
    }
    return NextResponse.json({
        message : 'User not found',
        success : false
    },{status:400})

} catch (error:any) {
        return NextResponse.json({
            message : error.message
        },{status:400})  
}
}