import { DBconnect } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";


DBconnect()

export async function GET(request : NextRequest){
    try {
        
        const response = NextResponse.json({
            message : "Logout successfull",
            success: true
        } , {status:200})
        response.cookies.delete("token")

        return response

    } catch (error:any) {
        return NextResponse.json({
            message : error.message,
            success: false
        } , {status:500})
    }
}