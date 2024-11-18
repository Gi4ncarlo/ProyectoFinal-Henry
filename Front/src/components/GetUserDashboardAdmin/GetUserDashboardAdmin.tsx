import { useEffect, useState } from "react";
import { getUsers } from "@/helpers/userOrders.helpers";

const GetUserDashboardAdmin = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Asegúrate de obtener el token de alguna fuente (como el localStorage o el estado global)
  const token = localStorage.getItem("userSession");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        setError("No estás autenticado.");
        setLoading(false);
        return;
      }
      try {
        const usersData = await getUsers(token);
        console.log(usersData); // Verificar los datos
        if (usersData && Array.isArray(usersData.data)) {
          setUsers(usersData.data);
        } else {
          setError("Los datos de los usuarios no están en el formato esperado.");
        }
      } catch (error) {
        setError("Error al obtener los usuarios. Intenta más tarde.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div>
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p><strong>Nombre:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Rol:</strong> {user.role}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetUserDashboardAdmin;
