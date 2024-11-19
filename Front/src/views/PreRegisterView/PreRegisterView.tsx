
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const PreRegisterView = () => {
  

  return (
    <div className="flex">
  <div>
    <Link href="/register?role=cliente">
      <Image
        className="rounded-full"
        src="/images/client.jpeg"
        alt="Cliente"
        width={384}
        height={384}
        priority 
      />
      <h3>Cliente</h3>
    </Link>
  </div>

  <div>
    <Link href="/register?role=jardinero">
      <Image
        className="rounded-full"
        src="/images/gardeners.jpeg"
        alt="Jardinero"
        width={384}
        height={384}
        priority 
      />
      <h3>Jardinero</h3>
    </Link>
  </div>
</div>

  );
};

export default PreRegisterView;
