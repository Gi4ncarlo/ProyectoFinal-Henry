import React from 'react';
import ProviderCard from '../ProviderCard/ProviderCard';

interface ServiceProvider {
  id: number;
  providerName: string;
  description: string;
  imageUrl: string;
  rating: number;
}

interface ServiceProviderListProps {
  providers: ServiceProvider[];
}

const ProviderList: React.FC<ServiceProviderListProps> = ({ providers }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {providers.map(provider => (
        <ProviderCard
          key={provider.id}
          providerName={provider.providerName}
          description={provider.description}
          imageUrl={provider.imageUrl}
          rating={provider.rating}
        />
      ))}
    </div>
  );
};

export default ProviderList;
