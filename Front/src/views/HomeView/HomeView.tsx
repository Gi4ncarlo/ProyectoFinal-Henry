import React from 'react';
import ProviderList from '../../components/ProviderCardList/ProviderCardList';

const Home: React.FC = () => {
  const serviceProviders = [
    {
      id: 1,
      providerName: 'Green Gardens',
      description: 'Expert gardening services for a lush, green garden.',
      imageUrl: '/images/gardening.jpg',
      rating: 3.5,
    },
    {
      id: 2,
      providerName: 'Perfect Lawns',
      description: 'Professional lawn care and landscaping services.',
      imageUrl: '/images/lawn.jpg',
      rating: 4.8,
    },
    {
      id: 3,
      providerName: 'Tree Trimmers Co.',
      description: 'Safe and efficient tree trimming and removal.',
      imageUrl: '/images/tree-trimming.jpg',
      rating: 4.6,
    },
  ];

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Our Service Providers</h1>
      <ProviderList providers={serviceProviders} />
    </main>
  );
};

export default Home;
