"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function SignUppage() {
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
        } catch (error:any) {
            console.log(error?.response?.data?.message)
            toast.error("user Sign up error",{
                position:"top-center"
            })
        }
    }
    return (
        <div className=' flex justify-center min-h-screen'>
        <Toaster />
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

