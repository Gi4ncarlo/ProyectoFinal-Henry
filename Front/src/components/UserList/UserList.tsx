import React, { useState, useEffect } from 'react';
import { banUser, getAllUsers } from '@/helpers/userOrders.helpers';

interface User {
  id: string;
  name: string;
  email?: string;
  isBanned: boolean;
  role: string;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isBanning, setIsBanning] = useState(false);
  const [banError, setBanError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        if (response) {
          setUsers(response.data);
        } else {
          console.error('No user data received from getAllUsers');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleBanUnbanUser = async (userId: string, isBanned: boolean) => {
    setIsBanning(true);
    setBanError(null);

    try {
      const token = localStorage.getItem('userSession');
      if (token) {
        await banUser(userId, token, isBanned);

        const updatedUsers = await getAllUsers();
        setUsers(updatedUsers.data);

        alert(isBanned ? 'Usuario desbaneado' : 'Usuario baneado');
      } else {
        console.error('User token not found');
        setBanError('Token de usuario no encontrado');
      }
    } catch (error) {
      console.error('Error banning/unbanning user:', error);
      setBanError(error.message || 'Error al banear/desbanear usuario');
    } finally {
      setIsBanning(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-2">
      {users.map((user) => (
        <div key={user.id} className="bg-white rounded-lg shadow-md mb-4 px-4 py-3">
          <p className="font-bold text-lg">{user.name}</p>
          <p>Estado: {user.isBanned ? 'Baneado' : 'Desbaneado'}</p>
          <p>Rol: {user.role}</p>
          {isBanning && <p>Baneado/Desbaneando...</p>}
          {banError && <p style={{ color: 'red' }}>{banError}</p>}
          <button
            onClick={() => handleBanUnbanUser(user.id, user.isBanned)}
            className="px-4 py-2 rounded-md bg-lime-700 text-white hover:bg-emerald-700 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isBanning}
          >
            {user.isBanned ? 'Desbanear' : 'Banear'} Usuario
          </button>
        </div>
      ))}
    </div>
  );
}

export default UserList;