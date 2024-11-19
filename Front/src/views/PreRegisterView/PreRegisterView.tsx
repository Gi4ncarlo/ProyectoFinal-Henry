import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PreRegisterView = () => {
  return (
    <div className="flex justify-around h-screen items-center">
      {/* Cliente */}
      <div className="relative group">
        <Link href="/register?role=cliente">
          <Image
            className="rounded-full transition-all group-hover:opacity-50"
            src="/images/client.jpeg"
            alt="Cliente"
            width={384}
            height={384}
            priority
          />
          {/* Texto */}
          <div className="absolute inset-0 flex items-center justify-center text-[#263238] text-3xl font-[900] opacity-0 group-hover:opacity-100 transition-opacity">
            Usuario
          </div>
        </Link>
      </div>

      {/* Jardinero */}
      <div className="relative group">
        <Link href="/register?role=jardinero">
          <Image
            className="rounded-full transition-all group-hover:opacity-50"
            src="/images/gardeners.jpeg"
            alt="Jardinero"
            width={384}
            height={384}
            priority
          />
          {/* Texto */}
          <div className="absolute inset-0 flex items-center justify-center text-[#263238] text-3xl font-[900] opacity-0 group-hover:opacity-100 transition-opacity">
            Jardinero
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PreRegisterView;
