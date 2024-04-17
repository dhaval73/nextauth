import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export const getUserIdByToken =(request:NextRequest) =>{
    const token = request.cookies.get("token")?.value || "";
    // console.log(token);
    if(token){
        const decodedToken : any = jwt.verify(token,process.env.JWT_SECRET!);
        // console.log(decodedToken);
        return decodedToken.id;
    }
    return null;
}