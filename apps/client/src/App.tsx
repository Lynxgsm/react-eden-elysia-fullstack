import type { App } from '@services/app';
import { treaty } from '@elysiajs/eden';
import { useEffect, useState } from 'react';
import { SERVICE_APP_PORT } from '@services/environments';

const appService = treaty<App>(`http://localhost:${SERVICE_APP_PORT}`);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<
    {
      name: string;
      id: number;
      age: number;
    }[]
  >([]);
  const getUsers = async () => {
    const { data } = await appService.users.get();
    if (data) {
      setUsers(data);
    }
    setLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
}
