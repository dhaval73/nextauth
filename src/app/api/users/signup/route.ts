import { DBconnect } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bycryptjs from 'bcryptjs';
import { sendMail } from "@/helpers/mailer";

DBconnect()

export async function POST(request : NextRequest)
{
    try {
        const reqBody =await request.json();
        const { username , email , password}=reqBody; 
        console.log(reqBody);
        
        //Check if the user has provided all the required data
        if( !username || !email || !password ) throw new Error("Missing Data");
        let user= await User.findOne({email:email});
        
        //If the user is already registered, return an error message
        if (user) throw new Error('User Already Registered');
        
        const salt= await bycryptjs.genSalt(10);
        //Hashing the password with a salt
        const hashPassword=await bycryptjs.hash(password,salt);
        //Create a new user and save it to the database
        user = new User(
            {
            username, 
            email, 
            password:hashPassword
            }
        )
        const savedUser =await user.save();

        const emailres =await sendMail({email , emailType: "VERIFY" , userId:savedUser._id })
        console.log(emailres);
        return NextResponse.json({
            message:"Registration Successful! Please Verify Your Email",
            success:true,
            savedUser
        } );

    } catch (error:any) {
        return NextResponse.json({status:"Error",message:error.message},{ status:400})
    }
};