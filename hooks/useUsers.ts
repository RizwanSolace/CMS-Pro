"use client";

import { useState } from "react";
import { mockUsers } from "@/data/mockUsers";

export default function useUsers() {
  const [users, setUsers] = useState(mockUsers);

  return {
    users,
    setUsers,
  };
}