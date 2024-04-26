import React from "react";
import { useGetUsers } from "../features/users/useUsers";
import UserForm from "../features/authentication/UserForm";

export default function Users() {
  const { isLoading, users } = useGetUsers();
  console.log(users);
  return <UserForm />;
}
