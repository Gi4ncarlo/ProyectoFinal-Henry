"use client"
import DashboardAdminCompo from '@/components/DashboardAdminCompo/DashboardAdminCompo';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);  // Start as null

  useEffect(() => {
    // Ensure code only runs on the client
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("userSession") || "null");
      console.log(user?.token); // Logs the token if it exists
      console.log("Usersession", user);

      if (user && user.token && user.user.role) {
        setAuthorized(true);
      } else {
        console.log("Redirecting to login");
        router.push("/login");
      }
    }
  }, [router]);

  // Show nothing while determining authorization (prevents rendering issues)
  if (authorized === null) return null;

  // Render the content once we know the authorization status
  if (!authorized) return null;

  return (
    <div className='mt-32 p-8 justify-center'>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
