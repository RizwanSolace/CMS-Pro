"use client";

import { useEffect, useState } from "react";
//import { mockUsers } from "@/data/mockUsers";
import { userService } from "@/services/user.service";
import { User } from "@/types/user";

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | null>(null);

useEffect(() => {
  fetchUsers();
}, []);

const fetchUsers = async () => {
  try { 
    setLoading(true);
    const res = await userService.getUsers({
      page: 1,
      limit: 10,
    });

    const mappedUsers = res.data.users.map((user: any) => ({
  ...user,
  id: user._id,
}));

console.log("Mapped users:", mappedUsers);

setUsers(mappedUsers);
     console.log("Latest users from API:", res.data.users)
  } catch (err) {
    setError(err as Error);
  } finally {
    setLoading(false);
  }
};
return {
  users,
  loading,
  error,
   fetchUsers,
};
}