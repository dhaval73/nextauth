"use client"
import { useParams } from "next/navigation"
import React from "react"
export default  function ProfilePage() {
    const param = useParams()
    console.log(param.id);
    
    return (
      <div className="flex justify-center min-h-screen">
          <div className="mt-36">
          User Id: {param.id}
          </div>
      </div>
    )
  }
  
