"use client"
import React from 'react';
import CardList from '../../components/ServiceCardList/ServiceCardList';

const services = [
  {
    id: 1,
    title: 'Lawn Mowing',
    description: 'Professional lawn mowing to keep your yard looking neat.',
    imageUrl: '/images/lawn-mowing.jpg',
    rating: 4.5,
    price: '$30',
    companyName: 'Green Thumb Landscaping',
  },
  {
    id: 2,
    title: 'Garden Design',
    description: 'Creative garden design services to bring your vision to life.',
    imageUrl: '/images/garden-design.jpg',
    rating: 4.8,
    price: '$150',
    companyName: 'Nature’s Touch',
  },
  {
    id: 3,
    title: 'Tree Trimming',
    description: 'Expert tree trimming for healthy growth and better aesthetics.',
    imageUrl: '/images/tree-trimming.jpg',
    rating: 4.6,
    price: '$50',
    companyName: 'Topiary Pros',
  },
  {
    id: 4,
    title: 'Weed Control',
    description: 'Efficient weed control to maintain a beautiful garden.',
    imageUrl: '/images/weed-control.jpg',
    rating: 4.7,
    price: '$40',
    companyName: 'Eco Garden Solutions',
  },
];

const HomeView: React.FC = () => {
  const handleHireService = (serviceId: number) => {
    alert(`Service with ID ${serviceId} hired!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Gardening Services</h1>
      <CardList services={services} onHireService={handleHireService} />
    </div>
  );
};

export default HomeView;
