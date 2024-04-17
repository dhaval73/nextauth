"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {toast} from 'react-hot-toast'

export default function SignUppage() {
    const router = useRouter()
    const [userData, setUserdata] = useState({
        username:'',
        email:'',
        password:'',
    })
    

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        console.log(userData)
        try {
            const res = await axios.post("api/users/signup",{...userData});
            console.log(res)
            toast.success("Sign Up Successfull",{
                position:"bottom-left"
            })
            router.push("/login")
        } catch (error:any) {
            console.log(error?.response?.data?.message)
            toast.error(error?.response?.data?.message,{
                position:"bottom-center"
            })
        }
    }
    
    return (
        <div className=' flex justify-center min-h-screen'>
            <div className="mt-36">
                <h1 className=" text-3xl ">Sign Up</h1>
                <form  onSubmit={handleSubmit} className=' mt-12 flex flex-col gap-5'>
                    <div className=" flex flex-col">
                        <label htmlFor="username">User Name</label>
                        <input 
                        id='username' 
                        type="text" 
                        className=' mt-1 bg-transparent border border-gray-400 rounded-lg px-2 py-1' 
                        required 
                        value={userData.username}
                        onChange={(e) => setUserdata({...userData, username: e.target.value})}
                        />
                    </div>
                    <div className=" flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input 
                        id='email' 
                        type="email" 
                        className=' mt-1 bg-transparent border border-gray-400 rounded-lg px-2 py-1' 
                        required 
                        value={userData.email}
                        onChange={(e) => setUserdata({...userData, email: e.target.value})}
                        />
                    </div>
                    <div className=" flex flex-col">
                        <label htmlFor="password">Pasword</label>
                        <input 
                        id='password' 
                        type="password" 
                        className=' mt-1 bg-transparent border border-gray-400 rounded-lg px-2 py-1' 
                        required 
                        value={userData.password}
                        onChange={(e) => setUserdata({...userData, password: e.target.value})}
                        />
                    </div>
                    <div className=" flex justify-between items-end">
                        <button 
                            type="submit"
                            className=' border border-gray-400 rounded-lg w-fit px-2 py-1'
                           
                         >
                            Submit
                        </button>
                        <Link 
                        href='/signup' 
                        className=' w-fit'
                        >
                            Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

