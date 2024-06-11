import supabase from "./supabase";

export async function getUsers() {
  const {
    data: { users },
    error,
  } = await supabase.auth.api.listUsers();

  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }

  return users;
}
