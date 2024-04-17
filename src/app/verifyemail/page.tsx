"use client"
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import {toast} from 'react-hot-toast';

export default function VerifyEmailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const verifyEmail = async ()=>{
        console.log(token);
        try {
            const res = await axios.post("/api/users/verifyemail",{token})
            console.log(res.data);
            toast.success("Email verified successfully",{
                position: "top-center",
            });
            router.push("/login");
        } catch (error:any) {
            console.log(error?.response?.data.error)
            toast.error(error?.response?.data?.error,{
                position:"bottom-center"
            })
        }
    }
  return (
    <div className=' flex justify-center min-h-screen'>
            <div className="mt-36">
                <button 
                type='button'
                onClick={verifyEmail}
                >
                    click to verify email
                </button>
            </div>
    </div>
  )
}

