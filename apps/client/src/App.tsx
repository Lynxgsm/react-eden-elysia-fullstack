import type { UserService } from "@services/users/services";
import { treaty } from "@elysiajs/eden";
import { useEffect, useState } from "react";

const userService = treaty<UserService>("http://localhost:4001");

export default function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { data, status } = await userService.users.get();
      console.log(data, status);
      setUsers(data as any);
    };

    fetch();
  }, []);

  if (users) {
    return (
      <ul>
        {users.map((user) => (
          <li key={user.id}>Hi {user.firstname}</li>
        ))}
      </ul>
    );
  }

  return <p>Loading...</p>;
}
