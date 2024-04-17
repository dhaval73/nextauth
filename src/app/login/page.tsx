import Link from 'next/link'
import React from 'react'

export default function Loginpage() {
  return (
    <div className=' flex justify-center min-h-screen'>
      <div className="mt-36">
      <h1 className=" text-3xl ">Login</h1>
      <form className=' mt-12 flex flex-col gap-5'>
        <div className=" flex flex-col">
        <label htmlFor="email">Email</label>
        <input id='email' type="email" className=' mt-1 bg-transparent border border-gray-400 rounded-lg px-2 py-1' />
        </div>
        <div className=" flex flex-col">
        <label htmlFor="password">Pasword</label>
        <input id='password' type="password" className=' mt-1 bg-transparent border border-gray-400 rounded-lg px-2 py-1' />
        </div>
        <div className=" flex justify-between items-end">
        <button type="submit" className=' border border-gray-400 rounded-lg w-fit px-2 py-1'>Submit</button>
        <Link href='/signup' className=' w-fit'>Sign Up</Link>
        </div>
      </form>
      </div>
    </div>
  )
}

