import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/serviceProvided`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al obtener los servicios:', error);
    res.status(500).json({ error: 'Error fetching services' });
  }
}
