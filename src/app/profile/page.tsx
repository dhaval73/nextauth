"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function GetUserpage() {
    const router = useRouter()
    const [user,setUser]=useState<{
        username:string,
        email:string,
        _id:string
    }>()
    useEffect(()=>{
        ;(async ()=>{
        try {
                const res = await axios.get("/api/users/me" ,{
                    withCredentials:true
                })
                console.log(res); 
                setUser(res.data.data)
        } catch (error) {
            toast.error("User not found Please login")
        }
    })();
    },[])

    const logout =async ()=>{
        try {
            await axios.get("/api/users/logout",{
                withCredentials:true
            })
            router.push("/login")
            toast.success("Logout Successfully")
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    
  return (
    <div className="flex justify-center min-h-screen">
        <div className="mt-36">
            { !user  ?"No user Found":
            <div className=" flex justify-center items-center flex-col gap-4">

            <h1 className="text-2xl font-bold">Welcome {user.username}</h1>
            <Link 
            href={`profile/${user._id}`}
            className=" px-2 py-1 border border-gray-400 rounded-lg"
            >
                Vsit Profile
            </Link>

            <button onClick={logout} className="px-2 py-1 border border-gray-400 rounded-lg">Logout</button>
            </div>
            }
        </div>
    </div>
  )
}

 