import ProviderCardList from "@/components/ProviderCardList/ProviderCardList";
import React from "react";
import dynamic from 'next/dynamic'
 
const DynamicComponentWithNoSSR = dynamic(
  () => import('../../app/gardener/[id]/page'),
  { ssr: false }
)


const gardeners = () => {
  return (
    <div className="flex">
      <DynamicComponentWithNoSSR/>
      <ProviderCardList />
    </div>
  );
};

export default gardeners;
