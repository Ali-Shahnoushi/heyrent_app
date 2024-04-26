import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("settings could not be loaded");
  }

  return data;
}

export async function editSettings(newSettings) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSettings)
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }

  return data;
}
