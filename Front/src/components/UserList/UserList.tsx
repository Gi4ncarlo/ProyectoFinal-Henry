import React, { useState, useEffect } from "react";
import { banUser, deleteUser, getAllUsers } from "@/helpers/userOrders.helpers";
import { log } from "console";

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
  const [banError, setBanError] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        if (response) {
          setUsers(response.data);
        } else {
          console.error("No user data received from getAllUsers");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleBanUnbanUser = async (userId: string, isBanned: boolean) => {
    setIsBanning(true);
    setBanError(null);

    try {
      const token = localStorage.getItem("userSession");
      if (token) {
        await banUser(userId, isBanned);

        const updatedUsers = await getAllUsers();
        setUsers(updatedUsers.data);

        alert(isBanned ? "Usuario desbaneado" : "Usuario baneado");
      } else {
        console.error("User token not found");
        setBanError("Token de usuario no encontrado");
      }
    } catch (error: any) {
      console.error("Error banning/unbanning user:", error);
      setBanError(error.message || "Error al banear/desbanear usuario");
    } finally {
      setIsBanning(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("userSession");
      if (token) {
        await deleteUser(userId);
        const updatedUsers = await getAllUsers();
        setUsers(updatedUsers.data);
        alert("Usuario eliminado correctamente");
      } else {
        console.error("User token not found");
        setBanError("Token de usuario no encontrado");
      }
    } catch (error: any) {
      console.error("Error deleting user:", error);
      alert("Error al eliminar el usuario");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Lista de Usuarios</h1>

      {banError && (
        <div className="bg-red-100 text-red-800 px-4 py-3 mb-4 rounded-lg">
          {banError}
        </div>
      )}

      {users.length === 0 ? (
        <p className="text-gray-500 text-center">No hay usuarios para mostrar.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-lg text-gray-800 mb-2">
                {user.name}
              </h2>
              <p className="text-gray-600">Estado: {user.isBanned ? "Baneado" : "Activo"}</p>
              <p className="text-gray-600">Rol: {user.role}</p>

              {/* Botón de banear/desbanear */}
              <button
                onClick={() => handleBanUnbanUser(user.id, user.isBanned)}
                className={`mt-4 px-4 py-2 rounded-md font-medium transition ${user.isBanned
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-green-500 text-white hover:bg-green-600"
                  } disabled:bg-gray-400 disabled:cursor-not-allowed`}
                disabled={isBanning}
              >
                {isBanning ? "Procesando..." : user.isBanned ? "Desbanear" : "Banear"}
              </button>

              {/* Botón de eliminar */}
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="mt-4 px-4 py-2 m-4 rounded-md font-medium bg-red-700 text-white hover:bg-red-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isBanning}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserList;
