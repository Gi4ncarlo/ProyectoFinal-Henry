"use client"
import DashboardAdminCompo from '@/components/DashboardAdminCompo/DashboardAdminCompo';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Layout  = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
      const [authorized, setAuthorized] = useState(false);  

useEffect(()=>{
const user= JSON.parse(localStorage.getItem("userSession")|| "null")  ;

console.log(user?.token); // Logs the token if it exists
console.log("Usersession", user);

if(user && user.token && user.user.role){
setAuthorized(user);
}else{
    console.log("Redirecting to login");
    router.push("/login")
}

},[router])

if (!authorized) return null;

  return (
    <div className='mt-32 p-8 justify-center'>
         <main>{children}</main>
    </div>
  )
}

export default Layout;
