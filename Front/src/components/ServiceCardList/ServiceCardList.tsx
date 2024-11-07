"use client"
import React from 'react';
import Card from '../ServiceCard/ServiceCard';

interface Service {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  price: string;
  companyName: string;
}

interface CardListProps {
  services: Service[];
  onHireService: (serviceId: number) => void;
}

const ServiceCardList: React.FC<CardListProps> = ({ services, onHireService }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <Card
          key={service.id}
          title={service.title}
          description={service.description}
          imageUrl={service.imageUrl}
          rating={service.rating}
          price={service.price}
          companyName={service.companyName}
          onHire={() => onHireService(service.id)}
        />
      ))}
    </div>
  );
};

export default ServiceCardList;
