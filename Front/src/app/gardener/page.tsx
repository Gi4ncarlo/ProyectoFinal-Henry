import ProviderCardList from "@/components/ProviderCardList/ProviderCardList";
import React from "react";
 
const gardeners = () => {
  return (
    <div className="min-h-screen bg-green-50 flex bg-[url('/images/fondoJardineros2.jpg')] bg-cover bg-center">
      <ProviderCardList />
    </div>
  );
};

export default gardeners;

