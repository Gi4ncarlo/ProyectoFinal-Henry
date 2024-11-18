"use client"

import { getServicesProvided } from '@/helpers/service.helpers';
import { IService } from '@/interfaces/IService';
import React, { useEffect, useState } from 'react'

const DashboardAdminCompo = () => {
    const [services, setServices] = useState<IService[]>([]); // Servicios disponibles
   const [sortOrder] = useState<'asc' | 'desc'>('asc');


    useEffect(() => {
        // Cargar los servicios cuando el componente se monta
        fetchServices();
    }, [sortOrder]);

    // Fetch para obtener los servicios
    const fetchServices = async () => {
        try {
            const serviceData = await getServicesProvided();
            setServices(serviceData);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    return (
        <div>
            <h1>servicios disponibles:
            </h1>
<br />
            {
                services.map(services => (

                    <div key={services.id}>
                        <p>{services.detailService}</p>
                        <p>{services.categories}</p>
                        <p>{services.price}</p>
                        <br />
                    </div>

                ))
            }
        </div>
    )
}

export default DashboardAdminCompo;
