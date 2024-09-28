import React, { useEffect } from "react";
import { useGetUsers } from "../features/users/useUsers";
import UserForm from "../features/authentication/UserForm";

export default function Users() {
  useEffect(() => {
    document.title = `Users | HEYRENT!`;
  }, []);
  const { isLoading, users } = useGetUsers();
  console.log(users);
  return <UserForm />;
}
