import { DBconnect } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bycryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

DBconnect()

export async function POST(request : NextRequest){
    try {
        
   
    const reqBody = await request.json()
    const {email, password} = reqBody

    const user = await User.findOne({email})
    
    if(!user){
        return NextResponse.json({
            message : "User not found"
        },{status:400})
    }

    const isMatchPassword = await bycryptjs.compare(password , user.password)
    if(!isMatchPassword){
        return NextResponse.json({
            message : "Invalid Credintial",
        },{status:400})
    }

    const tokenData = {
        id : user._id,
        username : user.username,
        email : user.email,
        role : user.role
    }
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {expiresIn : '1d'})

    const response = NextResponse.json({
        message : "Login Success",
        token
    },{status:200})
    response.cookies.set('token', token, {
        httpOnly : true,
    })
    return response

} catch (error:any) {
    return NextResponse.json({
        message : error.message
    },{status:500})

}

}

    
        
